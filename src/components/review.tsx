import { useEffect, useMemo, useState } from "react";
import heroBg from "@/assets/Bg customer.png";

type Review = {
    id: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
    quote: string;
};

const REVIEWS_API = "https://rw-api-production.up.railway.app/reviews";

const MOCK_REVIEWS: Review[] = [
    {
        id: "tyler",
        name: "Tyler Stuckel",
        title: "Traveler & Writer",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        quote: "I love spending my downtime at a cozy coffee shop, surrounded by the warm aroma of freshly brewed blends and pastries.",
    },
    {
        id: "fin",
        name: "Finlay Wild",
        title: "Product Designer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        rating: 4,
        quote: "The espresso here is smooth and bold, and the staff remembers my order. It's an easy place to unwind and get inspired.",
    },
    {
        id: "maya",
        name: "Maya Griffith",
        title: "Food Blogger",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        quote: "A perfect mix of ambience and flavor. The latte art is gorgeous, and the playlists set the mood for slow mornings.",
    },
    {
        id: "sam",
        name: "Samir Patel",
        title: "Software Engineer",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
        rating: 4,
        quote: "Their cold brew fuels my late-night sprints. Cozy corners, fast Wi-Fi, and genuinely friendly baristas.",
    },
];

const clampRating = (value: number) => Math.min(5, Math.max(1, Math.round(value || 0)));

const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? "text-[#f7d398]" : "text-[#8c6f57]"}>
            *
        </span>
    ));

export function Review() {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
    const [current, setCurrent] = useState(0);
    const [isTabletDown, setIsTabletDown] = useState(false);

    const reviewList = useMemo(() => (reviews.length ? reviews : MOCK_REVIEWS), [reviews]);
    const total = reviewList.length;

    useEffect(() => {
        const controller = new AbortController();

        const loadReviews = async () => {
            try {
                const response = await fetch(REVIEWS_API, { signal: controller.signal });
                if (!response.ok) return;
                const payload = await response.json();
                if (!Array.isArray(payload)) return;

                const normalized: Review[] = payload.map((item: any, index: number) => ({
                    id: String(item?.id ?? item?._id ?? `api-${index}`),
                    name: item?.name ?? item?.fullName ?? "Guest",
                    title: item?.title ?? item?.role ?? item?.job ?? "Coffee Lover",
                    avatar: item?.avatar ?? item?.photo ?? MOCK_REVIEWS[index % MOCK_REVIEWS.length].avatar,
                    rating: clampRating(item?.rating ?? item?.stars ?? 5),
                    quote: item?.review ?? item?.feedback ?? item?.comment ?? item?.body ?? "Great coffee!",
                }));

                if (normalized.length) {
                    setReviews(normalized);
                    setCurrent(0);
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    // eslint-disable-next-line no-console
                    console.error("Failed to load reviews", error);
                }
            }
        };

        loadReviews();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleChange = (event: MediaQueryListEvent) => setIsTabletDown(event.matches);

        setIsTabletDown(mediaQuery.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    const getWrappedIndex = (index: number) => (index + total) % total;
    const centerIndex = total ? getWrappedIndex(current) : 0;
    const order = total ? [getWrappedIndex(current - 1), centerIndex, getWrappedIndex(current + 1)] : [];
    const displayOrder = total ? (isTabletDown ? [centerIndex] : order) : [];

    const goPrevious = () => setCurrent((prev) => getWrappedIndex(prev - 1));
    const goNext = () => setCurrent((prev) => getWrappedIndex(prev + 1));

    return (
        <section id="reviews" className="relative px-4 py-20">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10">
                <h2
                    className="text-center text-4xl text-[#f4d6a5] drop-shadow-lg md:text-5xl"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                    Customer Review
                </h2>

                <div className="relative w-full overflow-hidden rounded-[36px] bg-[#1c0f0d] shadow-[0_28px_60px_rgba(0,0,0,0.55)]">
                    <div className="absolute inset-0">
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-[2px] opacity-60"
                            style={{ backgroundImage: `url(${heroBg})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1813]/70 via-[#190d0b]/90 to-[#0f0706]" />
                    </div>

                    <div className="relative flex items-center gap-4 px-4 py-10 sm:px-8 md:px-10">
                        <button
                            type="button"
                            onClick={goPrevious}
                            className="group grid h-12 w-12 shrink-0 place-items-center text-[#f4d6a5] transition hover:-translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4d6a5]/60"
                            aria-label="Previous review"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-5 w-5 transition group-hover:-translate-x-0.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
                            </svg>
                        </button>

                        <div className="relative flex min-h-[420px] flex-1 items-end justify-center gap-4 sm:min-h-[440px] sm:gap-6 md:gap-8">
                            {displayOrder.map((idx, position) => {
                                const review = reviewList[idx];
                                const isActive = isTabletDown || position === 1;
                                const baseClass = isActive
                                    ? "h-[360px] w-[280px] sm:w-[300px] md:h-[380px] md:w-[320px] scale-[1.02] self-center z-10"
                                    : "hidden md:block h-[200px] w-[150px] md:h-[220px] md:w-[170px] scale-[0.9] opacity-80 self-end";

                                return (
                                    <article
                                        key={`${review.id}-${position}`}
                                        className={`group relative mx-auto shrink-0 overflow-hidden rounded-[28px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${baseClass}`}
                                    >
                                        {isActive ? (
                                            <>
                                                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-[#6b3c2e]/95 via-[#3f231b]/95 to-[#1c0f0d]/95" />
                                                <div className="absolute inset-0 rounded-[28px] border border-[#f4d6a5]/15 shadow-[0_26px_60px_rgba(0,0,0,0.55)]" />
                                                <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#f4d6a5]/80 bg-[#120a08] shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                                                    <img
                                                        src={review.avatar}
                                                        alt={`${review.name} profile`}
                                                        className="h-20 w-20 rounded-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>

                                                <div className="relative flex h-full flex-col items-center gap-3 px-8 pb-10 pt-24 text-center text-[#f7e8d0]">
                                                    <div className="h-20 w-20 rounded-full opacity-0" aria-hidden="true" />
                                                    <p
                                                        className="text-lg font-semibold"
                                                        style={{ fontFamily: '"Leiko", ui-serif, serif' }}
                                                    >
                                                        {review.name}
                                                    </p>
                                                    <p className="text-xs uppercase tracking-[0.2em] text-[#d9b37f]/90">
                                                        {review.title}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-lg">{renderStars(review.rating)}</div>
                                                    <p className="text-sm leading-relaxed text-[#f7e8d0]/90">{review.quote}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setCurrent(idx)}
                                                className="relative h-[50%] w-full"
                                                aria-label={`Open review from ${review.name}`}
                                            >
                                                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#2a1915]/60 via-[#1b100d]/70 to-[#0f0908]/90" />
                                                <div className="absolute inset-0 rounded-[24px] border border-[#f4d6a5]/10" />
                                                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0b0605]/90 via-[#0b0605]/60 to-transparent" />
                                                <div className="relative flex h-full items-end justify-center pb-6">
                                                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#f4d6a5]/60 bg-[#0f0908] shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition duration-300 group-hover:scale-105">
                                                        <img
                                                            src={review.avatar}
                                                            alt={`${review.name} profile`}
                                                            className="h-full w-full object-cover blur-[1px] opacity-60"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                            </button>
                                        )}
                                    </article>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={goNext}
                            className="group grid h-12 w-12 shrink-0 place-items-center text-[#f4d6a5] transition hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4d6a5]/60"
                            aria-label="Next review"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-5 w-5 transition group-hover:translate-x-0.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Review;
