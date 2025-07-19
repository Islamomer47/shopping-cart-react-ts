import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Home from "@/pages/Home";


function App() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Home />
      </main>
      <CartDrawer />
    </div>
  );
}

export default App;
