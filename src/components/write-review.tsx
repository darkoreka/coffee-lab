import { type FormEvent, useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import type { Product } from "./review";

const PRODUCTS_API = "http://localhost:8055/products";

type StatusMessage = { type: "success" | "error"; text: string } | null;

type WriteReviewProps = {
    products: Product[];
    selectedProductId: string;
    onSelectProduct: (productId: string) => void;
    onReviewAdded: (updatedProduct?: Product) => void;
};

const clampRating = (value: number) => Math.min(5, Math.max(1, Math.round(value || 0)));

const FALLBACK_PRODUCTS: Product[] = [
    { id: "pour-over-kit", name: "Copper Pour Over Kit" },
    { id: "espresso-scale", name: "Nano Espresso Scale" },
    { id: "cold-brew-bottle", name: "Glass Cold Brew Bottle" },
    { id: "walnut-tamper", name: "Walnut Handle Tamper" },
    { id: "magnetic-milk-frother", name: "Magnetic Milk Frother" },
    { id: "vacuum-travel-mug", name: "Vacuum Travel Mug" },
    { id: "canvas-barista-apron", name: "Canvas Barista Apron" },
    { id: "counter-knock-box", name: "Countertop Knock Box" },
    { id: "folded-filter-pack", name: "Folded Filter Pack" },
    { id: "airtight-bean-canister", name: "Airtight Bean Canister" },
    { id: "espresso-cleaner-tablets", name: "Espresso Cleaner Tablets" },
    { id: "smart-gooseneck-kettle", name: "Smart Gooseneck Kettle" },
    { id: "cupping-spoon-set", name: "Cupping Spoon Set" },
    { id: "instant-read-thermometer", name: "Instant Read Thermometer" },
    { id: "stainless-puck-screen", name: "Stainless Puck Screen" },
    { id: "dosing-funnel-pro", name: "Dosing Funnel Pro" },
    { id: "station-drip-mat", name: "Station Drip Mat" },
    { id: "double-wall-espresso-glasses", name: "Double Wall Espresso Glasses" },
    { id: "burr-cleaning-brush", name: "Burr Cleaning Brush" },
    { id: "water-mineral-kit", name: "Water Mineral Kit" },
];

const byPrefixAndName = {
    fas: {
        star: "star",
    },
} as const;

type IconName = (typeof byPrefixAndName)["fas"][keyof (typeof byPrefixAndName)["fas"]];

const FontAwesomeIcon = ({ icon, className }: { icon: IconName; className?: string }) => (
    <i className={["fa", `fa-${icon}`, className].filter(Boolean).join(" ")} aria-hidden="true" />
);

export function WriteReview({ products, selectedProductId, onSelectProduct, onReviewAdded }: WriteReviewProps) {
    const [newReview, setNewReview] = useState({ text: "", rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);

    const productOptions = [
        ...products,
        ...FALLBACK_PRODUCTS.filter((item) => !products.some((product) => product.id === item.id)),
    ];

    useEffect(() => {
        if (!selectedProductId && productOptions.length) {
            onSelectProduct(productOptions[0].id);
        }
    }, [selectedProductId, productOptions, onSelectProduct]);

    const handleSubmitReview = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = newReview.text.trim();

        if (!selectedProductId) {
            setStatusMessage({ type: "error", text: "Pick a product to add your review to." });
            return;
        }

        if (!trimmed) {
            setStatusMessage({ type: "error", text: "Please share a short note before submitting." });
            return;
        }

        setStatusMessage(null);
        setIsSubmitting(true);

        try {
            const response = await fetch(`${PRODUCTS_API}/${selectedProductId}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: trimmed,
                    rating: clampRating(newReview.rating),
                }),
            });

            const payload = await response.json().catch(() => null);

            if (!response.ok) {
                const errorMessage = payload?.error || "Unable to submit review right now.";
                throw new Error(errorMessage);
            }

            onReviewAdded(payload?.product);

            setNewReview({ text: "", rating: 5 });
            setStatusMessage({ type: "success", text: "Thanks! Your review was added." });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unable to submit review right now.";
            setStatusMessage({ type: "error", text: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto w-full mt-8 max-w-[960px] rounded-[28px] border border-[#f4d6a5]/10 bg-[#150c0b]/80 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-lg font-semibold text-[#f7e8d0]" style={{ fontFamily: '"Leiko", ui-serif, serif' }}>
                        Share your own sip story
                    </p>
                </div>
            </div>

            <form className="mt-4 space-y-4" onSubmit={handleSubmitReview}>
                <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
                    <label className="flex flex-col gap-2 text-sm text-[#f7e8d0]">
                        Product
                        <select
                            className="rounded-2xl border border-[#f4d6a5]/20 bg-[#0f0807] px-4 py-3 text-[#f7e8d0] shadow-inner outline-none transition focus:border-[#f4d6a5]/50"
                            value={selectedProductId}
                            onChange={(event) => onSelectProduct(event.target.value)}
                        >
                            <option value="" disabled>
                                Select a product
                            </option>
                            {productOptions.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name || product.id}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-[#f7e8d0]">
                        Rating
                        <div className="flex items-center gap-2 rounded-2xl border border-[#f4d6a5]/20 bg-[#0f0807] px-4 py-3 shadow-inner">
                            {Array.from({ length: 5 }, (_, index) => {
                                const value = index + 1;
                                const isActive = value <= newReview.rating;
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setNewReview((prev) => ({ ...prev, rating: value }))}
                                        className="p-1 transition w-10"
                                        aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={byPrefixAndName.fas.star}
                                            className={`${isActive ? "text-[#f7d398]" : "text-[#8c6f57]"} text-3xl`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-[#f7e8d0]">
                    What did you think?
                    <textarea
                        rows={3}
                        value={newReview.text}
                        onChange={(event) => setNewReview((prev) => ({ ...prev, text: event.target.value }))}
                        placeholder="Loved the bloom control on the pour over kit..."
                        className="rounded-2xl border border-[#f4d6a5]/20 bg-[#0f0807] px-4 py-3 text-[#f7e8d0] shadow-inner outline-none transition focus:border-[#f4d6a5]/50"
                    />
                </label>

                {statusMessage ? (
                    <div
                        className={`rounded-2xl px-4 py-3 text-sm ${statusMessage.type === "success"
                                ? "bg-[#1c2a17] text-[#d1f2a5] border border-[#d1f2a5]/30"
                                : "bg-[#2a1413] text-[#ffc9c9] border border-[#ffc9c9]/20"
                            }`}
                    >
                        {statusMessage.text}
                    </div>
                ) : null}

                <div className="flex items-center justify-between gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-full bg-[#f4d6a5] px-5 py-2 text-sm font-semibold text-[#2a0f0c] shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4d6a5]/60 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Sending..." : "Share Review"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WriteReview;
