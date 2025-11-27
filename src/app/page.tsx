import TTWrapped from "@/app/home/TTWrapped";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br">
      <div className={"grow"}>
        <TTWrapped />
      </div>
      <Footer />
    </main>
  );
}
