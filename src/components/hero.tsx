import heroBg from '@/assets/Rectangle 3.png'
import heroMachine from '@/assets/Hero Img.png'
import heroBeans from '@/assets/Coffees.png'
import { Button } from './ui/button'

export default function Hero() {
    return (
        <section
            id="home"
            className="pb-20 pt-32 md:px-8 md:pb-28 md:pt-40"
        >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-end gap-12 md:flex-row md:items-start md:justify-between">
                <div className="flex w-full max-w-lg flex-col items-center space-y-6 text-center md:items-start md:text-left translate-x-[+200px]">
                    <p className="text-sm uppercase tracking-[0.4em] text-[#d9b37f]">Best Coffee Shop</p>
                    <h1
                        className="text-5xl leading-tight text-[#f6e2c8] md:text-6xl lg:text-7xl"
                        style={{ fontFamily: '"Dancing Script", cursive' }}
                    >
                        Elza Coffee
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
                </div>

                <div className="relative hidden w-full items-center justify-center xl:flex xl:-mt-16">
                    <div className="relative h-[800px] w-[1000px] translate-y-[-200px] ">
                        <img
                            src={heroBg}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover translate-x-[310px]"
                        />
                        <img
                            src={heroMachine}
                            alt="Coffee brewing machine illustration"
                            className="absolute inset-x-0 bottom-0 mx-auto w-full translate-y-[7px]"
                        />
                        <img
                            src={heroBeans}
                            alt="Coffee beans cluster"
                            className="absolute bottom-[-30px] left-1/2 z-10 w-[800px] -translate-x-1/2[310px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
