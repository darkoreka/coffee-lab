import storyImage from '@/assets/Image-ourstory.png'

export function OurStory() {
    return (
        <section id="story" className="px-4 mb-10 overflow-visible">
            <div className="relative mx-auto flex w-full max-w-[1440px] max-h-[300px] flex-col gap-10 rounded-[56px] 
                      bg-gradient-to-r from-[#2a0f0c] via-[#3c1c14] to-[#4a271a] 
                      px-6 py-10 shadow-[0_25px_80px_rgba(0,0,0,0.55)] 
                      md:flex-row md:items-center md:px-10 md:py-14 overflow-visible">

                <div className="relative hidden lg:flex w-full justify-center md:w-auto overflow-visible">
                    <img
                        src={storyImage}
                        alt="Barista with coffee art"
                        className="
              relative z-10 translate-y-10 md:translate-y-20 w-full max-w-[520px] md:max-w-[500px] -ml-[4%] md:-ml-[6%] rounded-[40px] object-cover"
                    />
                </div>


                <div className="relative flex-1 max-w-[700px] mx-auto space-y-4 text-center text-[#f7e8d0] md:text-left">
                    <h2
                        className="absolute
              -top-30
              md:-top-27                     /* mindig picit kilóg a konténerből */
              right-4          /* távolság a konténer szélétől */
              text-3xl md:text-5xl
              text-[#f4d6a5]
              drop-shadow-lg"
                        style={{ fontFamily: '"Dancing Script", cursive' }}
                    >
                        Our Story
                    </h2>
                    <p className="text-lg leading-7 text-[#f1dcc1]/90">
                        Réka&apos;s Coffee is an artisan roastery that sources limited batches of specialty beans from farms
                        around the world. From medium-dark single origins to experimental espresso blends, every roast
                        is curated to highlight the subtle notes and aromas discovered on our travels. For coffee lovers
                        searching for unique brewing rituals, we also craft bespoke equipment paired with expert guides.
                    </p>

                    {/* <div className="flex items-center justify-center gap-3 pt-4 md:justify-start">
                        <span className="size-3 rounded-full bg-[#d0a26b]" />
                        <span className="size-3 rounded-full bg-white/30" />
                        <span className="size-3 rounded-full bg-white/25" />
                    </div> */}
                </div>
            </div>
        </section>
    )
}
