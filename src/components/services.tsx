import Eq from "@/assets/Eq.png";
import Tc from "@/assets/Tc.png";
import Ta from "@/assets/Ta.png";
import Bv from "@/assets/Bv.png";
import Ps from "@/assets/Ps.png";

type Item = { img: string; alt: string; label: string };

const ITEMS: Item[] = [
    { img: Eq, alt: "Coffee Equipment", label: "Equipment" },
    { img: Tc, alt: "Type of Coffee", label: "Type Of Coffee" },
    { img: Ta, alt: "Take Away Coffee Cup", label: "Take A Way" },
    { img: Bv, alt: "Coffee Beans Variant", label: "Beans Variant" },
    { img: Ps, alt: "Pastry Croissant", label: "Pastry" },
];

export function Services() {
    return (
        <section id="services" className="px-4 py-16">
            <div className="mx-auto w-full max-w-[1200px]">
                <h2
                    className="mb-10 text-center text-4xl md:text-5xl text-[#f4d6a5] drop-shadow-lg"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                    Services
                </h2>

                <ul
                    className="
            mx-auto grid max-w-[1050px] place-items-center gap-6
            grid-cols-2 sm:grid-cols-3 md:grid-cols-5
          "
                >
                    {ITEMS.map((it) => (
                        <li key={it.label} className="w-[170px]">
                            <div
                                className="
                  group h-[225px] w-[170px]
                  rounded-[28px] bg-[#4a271a]/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                  ring-0 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                  hover:ring-1 hover:ring-[#f4d6a5]/30
                  flex flex-col items-center justify-center
                "
                            >
                                <img
                                    src={it.img}
                                    alt={it.alt}
                                    className="h-[88px] w-[88px] object-contain mb-5 drop-shadow-md"
                                    loading="lazy"
                                />
                                <span
                                    className="text-center text-[#f7e8d0] text-sm md:text-base"
                                    style={{ fontFamily: '"Leiko", ui-serif, serif' }}
                                >
                                    {it.label}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
