"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, UserCheck, ShieldCheck, MessagesSquare } from "lucide-react"

const AppLogo = () => (
  <div className="flex flex-col leading-tight font-bold">
    <span className="text-2xl text-blue-600">Rent</span>
    <span className="text-2xl text-gray-800 dark:text-white">Pairs</span>
  </div>
)

export function HostLandingPage({ onStartListing }: { onStartListing: () => void }) {
  return (
    <div className="w-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between p-4">
          <AppLogo />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Găsește chiriașul ideal, fără efort.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-200">
            Conectează-te cu chiriași verificați care se potrivesc stilului tău de viață și regulilor casei. Mai puține
            vizionări, mai multe potriviri de calitate.
          </p>
          <Button
            size="lg"
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-lg"
            onClick={onStartListing}
          >
            Publică anunțul gratuit <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">De ce RentPairs pentru proprietari?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
            <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <UserCheck className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-semibold">Potriviri Compatibile</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Algoritmul nostru inteligent îți prezintă doar chiriași ale căror preferințe (buget, stil de viață,
                reguli) se aliniază cu oferta ta.
              </p>
            </Card>
            <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-semibold">Profiluri Verificate</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Încurajăm chiriașii să își verifice identitatea și să adauge referințe, oferindu-ți un plus de siguranță
                și încredere.
              </p>
            </Card>
            <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <MessagesSquare className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-semibold">Management Simplificat</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Comunică direct prin chat, planifică vizionări și gestionează totul într-un singur loc, de la primul
                contact până la semnarea contractului.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Cum funcționează</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center p-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold">Creează anunțul</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Adaugă detalii și fotografii ale proprietății tale în câteva minute.
              </p>
            </div>
            <div className="relative text-center p-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold">Primește potriviri</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Primești notificări doar când apar chiriași compatibili. Fără spam.
              </p>
            </div>
            <div className="relative text-center p-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold">Închiriază cu încredere</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Discută, organizează vizionări și alege chiriașul perfect pentru tine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ești gata să-ți listezi proprietatea?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Alătură-te comunității noastre de proprietari și descoperă o metodă mai bună de a închiria.
          </p>
          <Button
            size="lg"
            className="mt-10 bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg"
            onClick={onStartListing}
          >
            Începe acum - Este gratuit
          </Button>
        </div>
      </section>
    </div>
  )
}
