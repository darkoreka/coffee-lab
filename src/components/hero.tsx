import heroBg from '@/assets/Hero Img .png'
import heroBeans from '@/assets/Coffees.png'
import heroCard from '@/assets/card.png'
import { Button } from './ui/button'

export default function Hero() {
    return (
        <section
            id="home"
            className="relative pb-2 pt-32 "
        >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 md:flex-row md:items-start md:justify-between ">
                <div className="relative flex w-full max-w-lg flex-col items-center space-y-6 text-center pb-24 md:items-start md:text-left md:-translate-x-[-200px] md:-translate-y-[100px]">
                    <p className="text-sm uppercase tracking-[0.4em] text-[#d9b37f]">Best Coffee Shop</p>
                    <h1
                        className="text-5xl leading-tight text-[#f6e2c8] md:text-6xl lg:text-7xl"
                        style={{ fontFamily: '"Dancing Script", cursive' }}
                    >
                        Réka&apos;s Coffee
                    </h1>
                    <p className="max-w-lg text-lg text-[#cfb394]/90">
                        Today&apos;s good mood is sponsored by coffee search for your coffee now
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start">
                        <Button variant="light" className="uppercase tracking-wide text-sm">
                            Shop Now
                        </Button>
                        <Button variant="dark" className="uppercase tracking-wide text-sm">
                            Catalog
                        </Button>
                    </div>
                    <div className="pointer-events-none absolute -bottom-[215px] hidden w-full -translate-x-[50px] justify-center 2xl:flex">
                        <img
                            src={heroCard}
                            alt="Featured coffee card"
                            className="w-[260px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)] md:w-[300px]"
                        />
                    </div>
                </div>

                <div className="relative hidden w-full items-center justify-center xl:flex xl:-mt-16">
                    <div className="relative h-[800px] w-[1000px] translate-y-[-200px] overflow-hidden" >
                        <img
                            src={heroBg}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <img
                            src={heroBeans}
                            alt="Coffee beans cluster"
                            className="absolute bottom-[-30px] left-1/2 z-10 w-[800px] "
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
