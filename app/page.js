import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">

      <section className="bg-[url('/interior.jpg')] bg-cover bg-center text-white py-28 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Good Food, Fast Delivery</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Welcome to Aldos — your neighborhood restaurant serving freshly cooked meals
          that hit the spot, whether you’re dining in or ordering online.
        </p>
        <div className="mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium">
            Order Now
          </button>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-50 shadow-sm rounded-xl p-6">
            <Image
            src="/jollof.jpg"
            alt="my-food"
            width={300}
            height={300}
            className="w-[300px] h-[300px] rounded-xl mb-4 object-cover"/>
            <h3 className="text-xl font-semibold">Jollof Rice</h3>
            <p className="text-gray-600">Smoky jollof.</p>
          </div>
          <div className="bg-gray-50 shadow-sm rounded-xl p-6">
            <Image 
            src="/moimoi.jpg" 
            alt="Rice Bowls" 
            width={300}
            height={300}
            className="w-[300px] h-[300px] rounded-xl mb-4 object-cover" />
            <h3 className="text-xl font-semibold">Moimoi</h3>
            <p className="text-gray-600">Local favorites served hot and fresh.</p>
          </div>
          <div className="bg-gray-50 shadow-sm rounded-xl p-6">
            <Image 
            src="/swallow.jpg" 
            alt="Pizza" 
            width={300}
            height={300}
            className="w-[300px] h-[300px] rounded-xl mb-4 object-cover" />
            <h3 className="text-xl font-semibold">Swallow</h3>
            <p className="text-gray-600">Fluffy swallow paired with delicious soups.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-yellow-50 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <div className="text-yellow-600 text-4xl font-bold mb-2">1</div>
            <h3 className="font-semibold text-xl mb-2">Browse Menu</h3>
            <p>Explore our delicious dishes and choose your favorites.</p>
          </div>
          <div>
            <div className="text-yellow-600 text-4xl font-bold mb-2">2</div>
            <h3 className="font-semibold text-xl mb-2">Place Order</h3>
            <p>Add items to your cart and confirm your delivery details.</p>
          </div>
          <div>
            <div className="text-yellow-600 text-4xl font-bold mb-2">3</div>
            <h3 className="font-semibold text-xl mb-2">Enjoy</h3>
            <p>Relax while we bring your meal straight to your door.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <p className="italic text-gray-700">
              “The food tastes homemade and the delivery is always on time!”
            </p>
            <h4 className="mt-4 font-semibold">– Sarah O.</h4>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <p className="italic text-gray-700">
              “Aldos is my go-to for quick lunch — affordable and tasty.”
            </p>
            <h4 className="mt-4 font-semibold">– Daniel K.</h4>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <p className="italic text-gray-700">
              “Love their rice bowls! Great portions and flavor.”
            </p>
            <h4 className="mt-4 font-semibold">– Amina R.</h4>
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Order from Aldos Today</h2>
        <p className="mb-6">
          Experience delicious meals made with love — ready when you are.
        </p>
        <button className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
          Order Now
        </button>
      </section>
    </div>
  );
}
