import { useEffect, useMemo, useState } from "react";
import heroBg from "@/assets/Bg customer.png";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import WriteReview from "../Home/components/write-review";

type ProductReview = {
    id?: string;
    text?: string;
    rating?: number;
    review?: string;
    comment?: string;
    stars?: number;
    createdAt?: string;
};

type Product = {
    id: string;
    name?: string;
    description?: string;
    image?: string;
    reviews?: ProductReview[];
};

type NormalizedReview = {
    id: string;
    productId: string;
    productName: string;
    text: string;
    rating: number;
    createdAt?: string;
};

const PRODUCTS_API = "http://localhost:8055/products";
const LEGACY_REVIEWS_API = "https://rw-api-production.up.railway.app/reviews";

const FALLBACK_PRODUCTS: Product[] = [
    {
        id: "pour-over-kit",
        name: "Copper Pour Over Kit",
        description: "Handcrafted copper dripper paired with a matching kettle for precision brewing.",
        image: "https://picsum.photos/seed/pour/400/300",
        reviews: [
            {
                id: "pour-over-review-1",
                text: "Looks stunning on my counter and brews clean cups.",
                rating: 5,
                createdAt: "2024-01-12T08:15:00.000Z",
            },
            {
                id: "pour-over-review-2",
                text: "Beautiful but kettle lid gets hot.",
                rating: 3,
                createdAt: "2024-02-03T17:45:00.000Z",
            },
        ],
    },
    {
        id: "cold-brew-bottle",
        name: "Glass Cold Brew Bottle",
        description: "1L heat-tempered glass bottle with reusable stainless filter for smooth cold brew.",
        image: "https://picsum.photos/seed/coldbrew/400/300",
        reviews: [
            {
                id: "cold-brew-review-1",
                text: "Makes enough concentrate for the week, super easy cleanup.",
                rating: 4,
                createdAt: "2024-04-28T09:30:00.000Z",
            },
            {
                id: "cold-brew-review-2",
                text: "Wish it shipped with spare gaskets.",
                rating: 3,
                createdAt: "2024-04-30T13:20:00.000Z",
            },
        ],
    },
    {
        id: "espresso-scale",
        name: "Nano Espresso Scale",
        description: "Rechargeable espresso scale with 0.1g accuracy and auto-tare timer.",
        image: "https://picsum.photos/seed/scale/400/300",
        reviews: [
            {
                id: "espresso-scale-review-1",
                text: "Helps me dial in consistently every morning.",
                rating: 5,
                createdAt: "2024-03-19T11:05:00.000Z",
            },
        ],
    },
    {
        id: "walnut-tamper",
        name: "Walnut Handle Tamper",
        description: "58.5mm stainless base with hand-turned walnut handle for even puck prep.",
        image: "https://picsum.photos/seed/tamper/400/300",
        reviews: [
            {
                id: "walnut-tamper-review-1",
                text: "Weight feels balanced and fits my VST baskets perfectly.",
                rating: 5,
                createdAt: "2024-03-02T10:10:00.000Z",
            },
        ],
    },
    {
        id: "magnetic-milk-frother",
        name: "Magnetic Milk Frother",
        description: "USB-C rechargeable frother with dual-speed magnetic whisk for silky microfoam.",
        image: "https://picsum.photos/seed/frother/400/300",
        reviews: [
            {
                id: "magnetic-frother-review-1",
                text: "Great for quick flat whites when I skip the steam wand.",
                rating: 4,
                createdAt: "2024-05-05T07:45:00.000Z",
            },
            {
                id: "magnetic-frother-review-2",
                text: "Battery lasts a week of daily use.",
                rating: 5,
                createdAt: "2024-05-12T18:00:00.000Z",
            },
        ],
    },
];

const clampRating = (value: number) => Math.min(5, Math.max(1, Math.round(value || 0)));

const toProductsArray = (payload: unknown): Product[] => {
    if (Array.isArray(payload)) return payload as Product[];
    if (payload && typeof payload === "object" && Array.isArray((payload as any).products)) {
        return (payload as any).products as Product[];
    }
    return [];
};

const normalizeProductReviews = (products: Product[]): NormalizedReview[] =>
    products.flatMap((product, productIndex) => {
        const reviews = Array.isArray(product?.reviews) ? product.reviews : [];
        const productName = product?.name || `Coffee Product ${productIndex + 1}`;

        return reviews.map((item, reviewIndex) => {
            const text =
                (typeof item?.text === "string" && item.text.trim()) ||
                (typeof item?.review === "string" && item.review.trim()) ||
                (typeof item?.comment === "string" && item.comment.trim()) ||
                "Great coffee gear!";

            return {
                id: String(item?.id ?? `${product.id ?? "product"}-review-${reviewIndex}`),
                productId: product?.id || `product-${productIndex}`,
                productName,
                rating: clampRating(item?.rating ?? item?.stars ?? 5),
                text,
                createdAt: item?.createdAt,
            };
        });
    });

const normalizeLegacyReviews = (payload: unknown): NormalizedReview[] => {
    if (!Array.isArray(payload)) return [];

    return payload.map((item: any, index: number) => ({
        id: String(item?.id ?? item?._id ?? `api-${index}`),
        productId: item?.productId ?? `legacy-${index}`,
        productName: item?.productName ?? item?.name ?? "Coffee Product",
        rating: clampRating(item?.rating ?? item?.stars ?? 5),
        text: item?.review ?? item?.feedback ?? item?.comment ?? item?.body ?? "Great coffee!",
        createdAt: item?.createdAt,
    }));
};

const FALLBACK_REVIEWS = normalizeProductReviews(FALLBACK_PRODUCTS);

const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "text-[#f7d398]" : "text-[#8c6f57]"}>
            *
        </span>
    ));

const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

export function Reviews() {
    const [reviews, setReviews] = useState<NormalizedReview[]>(FALLBACK_REVIEWS);
    const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
    const [selectedProductId, setSelectedProductId] = useState<string>("all");
    const [formProductId, setFormProductId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const loadReviews = async () => {
            let hydrated = false;
            let productsToUse: Product[] = FALLBACK_PRODUCTS;

            try {
                const response = await fetch(PRODUCTS_API, { signal: controller.signal });
                if (response.ok) {
                    const payload = await response.json();
                    const productList = toProductsArray(payload);
                    if (productList.length) {
                        productsToUse = productList;
                    }
                    const normalized = normalizeProductReviews(productList);
                    if (normalized.length) {
                        setReviews(normalized);
                        hydrated = true;
                    }
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    // eslint-disable-next-line no-console
                    console.error("Failed to load product reviews", error);
                }
            }

            if (!hydrated) {
                try {
                    const response = await fetch(LEGACY_REVIEWS_API, { signal: controller.signal });
                    if (response.ok) {
                        const payload = await response.json();
                        const normalized = normalizeLegacyReviews(payload);
                        if (normalized.length) {
                            setReviews(normalized);
                            hydrated = true;
                        }
                    }
                } catch (error) {
                    if (import.meta.env.DEV) {
                        // eslint-disable-next-line no-console
                        console.error("Failed to load legacy reviews", error);
                    }
                }
            }

            setProducts(productsToUse);
            setFormProductId((prev) => prev || productsToUse[0]?.id || "");

            if (!hydrated) {
                setReviews((prev) => (prev.length ? prev : FALLBACK_REVIEWS));
            }

            setIsLoading(false);
        };

        loadReviews();

        return () => controller.abort();
    }, []);

    const sortedReviews = useMemo(
        () =>
            [...reviews].sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                if (dateA !== dateB) return dateB - dateA;
                return b.rating - a.rating;
            }),
        [reviews],
    );

    const filteredReviews = useMemo(
        () =>
            selectedProductId === "all"
                ? sortedReviews
                : sortedReviews.filter((review) => review.productId === selectedProductId),
        [sortedReviews, selectedProductId],
    );

    const productOptions = useMemo(() => {
        const options = new Map<string, string>();
        sortedReviews.forEach((review) => {
            if (!options.has(review.productId)) {
                options.set(review.productId, review.productName);
            }
        });
        return [{ id: "all", name: "All products" }, ...Array.from(options.entries()).map(([id, name]) => ({ id, name }))];
    }, [sortedReviews]);

    const handleReviewAdded = (updatedProduct?: Product) => {
        if (!updatedProduct) return;

        setProducts((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === updatedProduct.id);
            const nextProducts =
                existingIndex === -1
                    ? [...prev, updatedProduct]
                    : prev.map((item, index) => (index === existingIndex ? { ...item, ...updatedProduct } : item));

            const normalized = normalizeProductReviews(nextProducts);
            if (normalized.length) {
                setReviews(normalized);
                setSelectedProductId("all");
            }

            return nextProducts;
        });

        setFormProductId(updatedProduct.id);
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#0e0706] text-[#f7e8d0]">
                <div className="relative isolate overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#120908]/70 via-[#0d0605]/85 to-[#0a0504]" />

                    <section className="relative mx-auto w-full max-w-[1200px] px-4 py-16 md:px-8 lg:py-20">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.25em] text-[#d9b37f]/80">Voices from our bar</p>
                                <h1
                                    className="text-4xl font-semibold text-[#f7e8d0] md:text-5xl"
                                    style={{ fontFamily: '"Leiko", ui-serif, serif' }}
                                >
                                    Customer Reviews
                                </h1>
                                <p className="max-w-2xl text-sm text-[#f7e8d0]/80">
                                    Every brew, every sip, every note. Browse what fellow coffee lovers are saying about their gear.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-[#d9b37f]/80">Filter</label>
                                <select
                                    value={selectedProductId}
                                    onChange={(event) => setSelectedProductId(event.target.value)}
                                    className="rounded-full border border-[#f4d6a5]/20 bg-[#130a09] px-4 py-2 text-sm text-[#f7e8d0] shadow-inner outline-none transition focus:border-[#f4d6a5]/50"
                                >
                                    {productOptions.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-[220px] rounded-3xl border border-[#f4d6a5]/10 bg-[#120908] shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                                    >
                                        <div className="h-full animate-pulse rounded-3xl bg-gradient-to-br from-[#1b0f0d] to-[#0f0807]" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-10 space-y-6">
                                <div className="flex items-center justify-between text-sm text-[#f7e8d0]/70">
                                    <p>
                                        Showing <span className="text-[#f7d398]">{filteredReviews.length}</span>{" "}
                                        {filteredReviews.length === 1 ? "review" : "reviews"}
                                    </p>
                                    <p>
                                        Sorted by <span className="text-[#f7d398]">newest</span> then rating
                                    </p>
                                </div>

                                {filteredReviews.length === 0 ? (
                                    <div className="rounded-3xl border border-[#f4d6a5]/10 bg-[#120908]/70 p-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                                        <p className="text-lg" style={{ fontFamily: '"Leiko", ui-serif, serif' }}>
                                            No reviews yet for this product.
                                        </p>
                                        <p className="mt-2 text-sm text-[#f7e8d0]/75">Be the first to share your experience.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {filteredReviews.map((review) => (
                                            <article
                                                key={review.id}
                                                className="group relative h-full rounded-3xl border border-[#f4d6a5]/10 bg-gradient-to-b from-[#1b0f0d] via-[#120908] to-[#0e0706] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition hover:-translate-y-1 hover:border-[#f7d398]/30"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p
                                                            className="text-lg font-semibold text-[#f7e8d0]"
                                                            style={{ fontFamily: '"Leiko", ui-serif, serif' }}
                                                        >
                                                            {review.productName}
                                                        </p>
                                                        <p className="text-xs uppercase tracking-[0.2em] text-[#d9b37f]/80">
                                                            {formatDate(review.createdAt)}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-full bg-[#0c0605] px-3 py-1 text-sm font-semibold text-[#f7d398] shadow-inner">
                                                        {review.rating.toFixed(1)} / 5
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex items-center gap-1 text-base">{renderStars(review.rating)}</div>
                                                <p className="mt-4 text-sm leading-relaxed text-[#f7e8d0]/85">{review.text}</p>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
        </div>
                <WriteReview
                    products={products}
                    selectedProductId={formProductId}
                    onSelectProduct={setFormProductId}
                    onReviewAdded={handleReviewAdded}
                />
            </main>
            <Footer />
        </>
    );
}

export default Reviews;

