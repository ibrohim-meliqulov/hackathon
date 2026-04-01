import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

export default function Problem() {
  return (
    <section id="muammo" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Muammo: O'simlik kasalliklari tufayli hosil yo'qotishlari</h2>
          <p className="text-lg text-muted-foreground">
            O'zbekistonda dehqonlar o'simlik kasalliklari tufayli katta miqdordagi hosilni yo'qotishadi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { value: "40%", label: "O'zbekistonda o'simlik kasalliklari tufayli o'rtacha yo'qotiladigan hosil miqdori" },
            { value: "$300M", label: "Qishloq xo'jaligida o'simlik kasalliklari tufayli etkaziladigan yillik iqtisodiy zarar" },
            { value: "85%", label: "Hosilni yo'qotishga sabab bo'ladigan kasalliklarning tezda aniqlanmaganligi" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 rounded-3xl shadow-sm border-none text-center h-full">
                <div className="text-5xl font-bold text-destructive mb-4">{stat.value}</div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Muayyan sabablar:</h3>
            <ul className="space-y-4">
              {[
                "Agronomik maslahat olish uchun mutaxassislarga murojaat qilishning qiyinligi va qimmatligi",
                "Kasalliklarni tez va to'g'ri aniqlash bo'yicha bilim va tajriba yetishmasligi",
                "Davolash vositalarini noto'g'ri tanlash va qo'llash",
                "Ma'lumotga kirish cheklovlari"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-destructive/10 p-8 rounded-3xl border border-destructive/20">
            <p className="text-destructive font-medium leading-relaxed">
              Bu muammolarni hal qilish uchun AgroScan - AI-guruhlangan platforma yaratildi, u har bir fermerga aqlli yordamchi bo'lib xizmat ko'rsatadi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
