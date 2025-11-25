import footerImage from '@/assets/Footer Img.png'
import footerBg from '@/assets/Bg footer.png'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
    return (
        <footer className=" w-full text-[#f3e2d1]">
            <section id="footer" className="relative mx-auto min-h-[40vh] overflow-visible bg-[#c3a38767] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0">
                    <img
                        src={footerBg}
                        alt="Coffee themed footer illustration"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="relative z-30 flex flex-col gap-12 px-6 pb-16 pt-16 md:flex-row md:px-12 lg:px-16">
                    <div className="flex flex-1 items-start gap-6 md:gap-10">
                        <div className="pointer-events-none -mt-16 flex w-[200px] shrink-0 justify-start drop-shadow-[0_18px_35px_rgba(0,0,0,0.45)] md:-mt-20 md:w-[240px] lg:-mt-24 lg:w-[280px]">
                            <img
                                src={footerImage}
                                alt=""
                                className="w-full object-contain"
                            />
                        </div>

                        <div className="grid flex-1 grid-cols-1 gap-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-4">
                                <h3
                                    className="text-lg font-semibold text-[#f6e7d2]"
                                    style={{ fontFamily: '"Leiko", serif' }}
                                >
                                    About
                                </h3>
                                <div className="space-y-2 text-[#f4e3d0]">
                                    <a className="block transition hover:text-white/95" href="#our-story">
                                        Our Story
                                    </a>
                                    <a className="block transition hover:text-white/95" href="#faq">
                                        FAQ
                                    </a>
                                    <a className="block transition hover:text-white/95" href="#careers">
                                        Careers
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3
                                    className="text-lg font-semibold text-[#f6e7d2]"
                                    style={{ fontFamily: '"Leiko", serif' }}
                                >
                                    Customer Resources
                                </h3>
                                <div className="space-y-2 text-[#f4e3d0]">
                                    <a className="block transition hover:text-white/95" href="#menu">
                                        Menu
                                    </a>
                                    <a className="block transition hover:text-white/95" href="#locations">
                                        Locations
                                    </a>
                                    <a className="block transition hover:text-white/95" href="#support">
                                        Support
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3
                                    className="text-lg font-semibold text-[#f6e7d2]"
                                    style={{ fontFamily: '"Leiko", serif' }}
                                >
                                    Services
                                </h3>
                                <div className="space-y-2 text-[#f4e3d0]">
                                    <a className="block transition hover:text-white/95" href="#payment-options">
                                        Payment Options
                                    </a>
                                    <a className="block transition hover:text-white/95" href="#refunds">
                                        Refunds & Exchanges
                                    </a>
                                    <a className="block transition hover:text-white/95" href="#liability">
                                        Limitation Of Liability
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4 text-[#f4e3d0]">
                                <div className="flex items-start gap-2">
                                    <MapPin className="mt-1 h-5 w-5 text-[#e5cbb2]" />
                                    <p>12 Jhon Avenue #35 - New York</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Mail className="mt-1 h-5 w-5 text-[#e5cbb2]" />
                                    <p>Rekacoffee@Coffee.Com</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Phone className="mt-1 h-5 w-5 text-[#e5cbb2]" />
                                    <p>+1-222-34-REKA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer
