import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Bepul (Free)",
    price: "0",
    features: [
      "Har kuni 5 ta diagnostika",
      "100+ kasallik turlari",
      "Asosiy davolash tavsiyalari",
      "O'zbek va rus tillarida"
    ],
    buttonText: "Boshlash",
    highlight: false
  },
  {
    name: "Asosiy (Starter)",
    price: "3",
    features: [
      "Chegarasiz diagnostika",
      "150+ kasallik turlari",
      "Detallangan davolash rejasi",
      "Zararli moddalar ro'yxati",
      "Har oy yangilanadi"
    ],
    buttonText: "Sotib olish",
    highlight: true
  },
  {
    name: "Korxona (Pro)",
    price: "10",
    features: [
      "Barcha asosiy funksiyalar",
      "150+ kasallik turlari",
      "Har oy 3 ta mutaxassis maslahati",
      "Hisobotlar va tahlil",
      "Qo'shimcha o'rnatish"
    ],
    buttonText: "Bog'lanish",
    highlight: false
  }
];

export default function Pricing() {
  return (
    <section id="narxlar" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Biznes modeli</h2>
          <p className="text-lg text-muted-foreground">
            AgroScan freemium biznes modeliga asoslangan - asosiy funksiyalari bepul, qo'shimcha xususiyatlari uchun to'lovli.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={plan.highlight ? "scale-105 z-10" : ""}
            >
              <Card className={`p-8 rounded-[2.5rem] border h-full flex flex-col ${
                plan.highlight 
                  ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20" 
                  : "bg-white border-gray-100 text-foreground"
              }`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}>/oy</span>
                </div>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-center text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.highlight ? "bg-white/20" : "bg-primary/10"
                      }`}>
                        <Check size={12} className={plan.highlight ? "text-white" : "text-primary"} />
                      </div>
                      <span className={plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.highlight ? "secondary" : "default"}
                  className={`w-full py-6 rounded-2xl font-bold transition-all active:scale-95 ${
                    plan.highlight ? "" : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
