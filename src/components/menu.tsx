const menuItems = [
    {
        category: 'Espresso', items: [
            { name: 'Espresso Shot', price: '$2.50' },
            { name: 'Double Espresso', price: '$3.50' },
            { name: 'Cortado', price: '$3.00' },
        ]
    },
    {
        category: 'Coffee', items: [
            { name: 'Cappuccino', price: '$4.50' },
            { name: 'Latte', price: '$4.50' },
            { name: 'Americano', price: '$3.50' },
        ]
    },
    {
        category: 'Cold Drinks', items: [
            { name: 'Iced Coffee', price: '$4.00' },
            { name: 'Cold Brew', price: '$4.50' },
            { name: 'Iced Latte', price: '$5.00' },
        ]
    },
    {
        category: 'Specialty', items: [
            { name: 'Caramel Macchiato', price: '$5.50' },
            { name: 'Mocha', price: '$5.00' },
            { name: 'Flat White', price: '$4.50' },
        ]
    },
]

export default function Menu() {
    return (
        <section id="menu" className="py-16 md:py-24 px-4 md:px-8 bg-background">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">Popular Menu</h2>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {menuItems.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-2xl font-bold text-accent border-b border-accent pb-3">{section.category}</h3>
                            <div className="space-y-3">
                                {section.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex justify-between items-center">
                                        <span className="text-foreground">{item.name}</span>
                                        <span className="text-accent font-semibold">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
