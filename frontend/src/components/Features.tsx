import { motion } from "motion/react";
import { Shield, Zap, Globe, BarChart3, Users, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: <Zap className="text-yellow-500" />,
    title: "Foto diagnostika",
    description: "Kasallikli o'simlikning fotosuratini oling va 3 soniyada natijani oling."
  },
  {
    icon: <Cpu className="text-blue-500" />,
    title: "AI tahlil",
    description: "Deep learning texnologiyasi bilan 150+ kasallikni aniqlaydi."
  },
  {
    icon: <Shield className="text-green-500" />,
    title: "Davolash maslahatlari",
    description: "Har bir kasallik uchun aniq tavsiyalar va zararli moddalar ro'yxati."
  },
  {
    icon: <BarChart3 className="text-purple-500" />,
    title: "Qo'llab-quvvatlash",
    description: "Davolash jarayonini kuzatish va vaqtida eslatmalar."
  },
  {
    icon: <Users className="text-orange-500" />,
    title: "92% aniqlik",
    description: "10,000+ fotosuratga asoslanib o'rgatilgan yuqori aniqlikdagi model."
  },
  {
    icon: <Globe className="text-red-500" />,
    title: "O'zbek tilida",
    description: "Barcha fermerlar uchun tushunarli va qulay interfeys."
  }
];

export default function Features() {
  return (
    <section id="yechim" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">AgroScan - Cho'ntak Agronomi</h2>
          <p className="text-lg text-muted-foreground">
            AI texnologiyasini qo'llab, o'simlik kasalliklarini fotosuratga asoslanib tez va aniq diagnostika qiladi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group h-full">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
