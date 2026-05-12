import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  CheckCircle2, 
  Star, 
  Dumbbell, 
  Zap, 
  Heart,
  Instagram,
  Facebook,
  Twitter,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  flavor: string;
  protein: number;
  calories: number;
  price: number;
  image: string;
}

// Data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "שוקולד צ'יפס קלאסי",
    flavor: "Classic Chocolate Chip",
    protein: 15,
    calories: 249,
    price: 15,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "פאד'ג שוקולד קלאסי",
    flavor: "Classic Chocolate Fudge",
    protein: 15,
    calories: 259,
    price: 16,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "פאד'ג שוקולד חמאת בוטנים",
    flavor: "Peanut Butter Fudge",
    protein: 16,
    calories: 269,
    price: 16,
    image: "https://images.unsplash.com/photo-1590080874088-eec64895b423?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "אמסטרדם ליבת פרלין לבן",
    flavor: "Amsterdam White Praline",
    protein: 15,
    calories: 267,
    price: 18,
    image: "https://images.unsplash.com/photo-1582294157140-97db3c988e0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "טריפל שוקולד",
    flavor: "Triple Chocolate",
    protein: 15,
    calories: 252,
    price: 17,
    image: "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Half & Half",
    flavor: "Half Dark & Half Light",
    protein: 15,
    calories: 258,
    price: 17,
    image: "https://images.unsplash.com/photo-1559622314-f35038fcc74c?auto=format&fit=crop&q=80&w=800"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{product: Product, quantity: number}[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark rtl font-sans selection:bg-brand-orange/30 overflow-x-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-brand-dark text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-brand-orange italic font-bold"
          >
            <CheckCircle2 className="w-5 h-5 text-brand-orange" />
            העוגייה התווספה לסל! 🍪
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="#" className="text-2xl font-black tracking-tighter text-brand-orange flex items-center gap-2">
              <Dumbbell className="w-8 h-8 rotate-[-15deg]" />
              <span className="uppercase italic">MUSCLE MUNCH</span>
            </a>
            <div className="hidden md:flex gap-6 font-semibold uppercase text-sm tracking-wide">
              <a href="#shop" className="hover:text-brand-orange transition-colors">החנות</a>
              <a href="#about" className="hover:text-brand-orange transition-colors">עלינו</a>
              <a href="#nutrition" className="hover:text-brand-orange transition-colors">ערכים</a>
              <a href="#contact" className="hover:text-brand-orange transition-colors">צור קשר</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2 hover:bg-brand-orange/10 rounded-full transition-all"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 hover:bg-brand-orange/10 rounded-full"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-dark text-white z-[60] p-8 flex flex-col items-center justify-center text-center gap-8"
          >
            <button 
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <a href="#shop" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase hover:text-brand-orange transition-colors">החנות</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase hover:text-brand-orange transition-colors">עלינו</a>
            <a href="#nutrition" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase hover:text-brand-orange transition-colors">ערכים</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase hover:text-brand-orange transition-colors">צור קשר</a>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="mt-4 px-10 py-5 bg-brand-orange text-white font-black italic uppercase rounded-2xl flex items-center gap-3 shadow-xl"
            >
              <ShoppingBag className="w-6 h-6" />
              הסל שלי ({cartCount})
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              עוגיות ספורטאים חדשות
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic leading-[0.9] text-brand-dark mb-6">
              מנשנשים חלבון,<br /> 
              <span className="text-brand-orange uppercase">לא פשרות.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-xl">
              CRAVE THE TREAT. EARN THE MUSCLE.
            </p>
            <p className="text-lg text-gray-500 mb-10 max-w-xl">
              עוגיות הבוטיק שלנו נאפות במקום במיוחד עבור אלו שלא מוותרים על הטעם בדרך למטרה. 
              15-16ג׳ חלבון, 0ג׳ סוכר מוסף, 100% טעם מושלם.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#shop" 
                className="px-10 py-5 bg-brand-dark text-white font-black italic uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
              >
                קנו עכשיו
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 space-x-reverse">
                  {[1, 2, 3].map(i => (
                    <img 
                      key={i} 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} 
                      className="w-10 h-10 rounded-full border-2 border-brand-cream" 
                      alt="User avatar" 
                    />
                  ))}
                </div>
                <div className="pr-2 leading-tight">
                  <div className="flex text-brand-orange">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <p className="text-xs font-bold">1,200+ לקוחות מרוצים</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring' }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-orange/20 blur-[100px] rounded-full scale-110"></div>
            <img 
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=1000" 
              className="relative w-full aspect-square object-cover rounded-[40px] shadow-2xl skew-y-1 transform group-hover:skew-y-0 transition-transform duration-500"
              alt="MUSCLE MUNCH Cookie"
              referrerPolicy="no-referrer"
            />
            {/* Stats floating boxes */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-500/10 text-green-500 flex items-center justify-center rounded-xl">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">חלבון נקי</p>
                <p className="text-2xl font-black italic">20ג׳</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute -top-10 -left-6 bg-brand-dark text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border-4 border-brand-orange"
            >
              <div className="w-12 h-12 bg-brand-orange flex items-center justify-center rounded-xl">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">ללא סוכר</p>
                <p className="text-2xl font-black italic leading-none">0ג׳</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Marquee */}
      <div className="bg-brand-dark py-4 overflow-hidden border-y-2 border-brand-orange flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex gap-12 items-center"
        >
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex gap-4 items-center text-white font-black italic text-2xl uppercase opacity-80">
              <span className="text-brand-orange tracking-widest">MUSCLE MUNCH</span>
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>אנרגיה נקייה</span>
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>טעם ממכר</span>
              <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Shop Section */}
      <section id="shop" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-black italic leading-[0.9] mb-6">מצאו את<br /><span className="text-brand-orange uppercase">הדלק שלכם.</span></h2>
              <p className="text-gray-600 text-lg">כל עוגייה מיוצרת בעבודת יד מחומרי גלם איכותיים בלבד. אין סוכרים מעובדים, אין פשרות.</p>
            </div>
            <div className="flex gap-3">
              <button className="p-4 border-2 border-brand-dark/10 rounded-xl hover:bg-brand-dark hover:text-white transition-all">
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="p-4 bg-brand-dark text-white rounded-xl hover:bg-brand-orange transition-all">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 bg-brand-cream">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black italic uppercase tracking-wider text-brand-dark">
                    {product.calories} קלוריות
                  </div>
                  <div className="absolute top-4 left-4 bg-brand-orange px-3 py-1 rounded-full text-[10px] font-black italic uppercase tracking-wider text-white">
                    {product.protein}ג׳ חלבון
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 left-4 right-4 bg-brand-dark text-white py-4 rounded-2xl font-bold italic translate-y-20 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-brand-orange shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    הוספה לסל
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-black italic leading-tight max-w-[70%]">{product.name}</h3>
                    <div className="text-2xl font-black text-brand-orange italic">₪{product.price}</div>
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-tighter italic">{product.flavor}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-brand-orange">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                icon: <Zap className="w-10 h-10" />, 
                title: "אנרגיה מתפרצת", 
                desc: "שילוב אופטימלי של חלבון ופחמימות מורכבות לבוסט לפני אימון או התאוששות מהירה אחריו." 
              },
              { 
                icon: <CheckCircle2 className="w-10 h-10" />, 
                title: "רכיבים טבעיים בלבד", 
                desc: "אנחנו לא מכניסים לעוגיות שלנו שום דבר שלא הייתם מוצאים במטבח הביתי. רק איכות מקסימלית." 
              },
              { 
                icon: <Dumbbell className="w-10 h-10" />, 
                title: "בניית שריר אופטימלית", 
                desc: "עם 20-22 גרם חלבון מי גבינה איכותי, השרירים שלכם מקבלים בדיוק את מה שהם צריכים." 
              }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-brand-dark p-10 rounded-[40px] text-white flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-brand-orange flex items-center justify-center rounded-3xl mb-8 group-hover:rotate-12 transition-transform shadow-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black italic mb-4 uppercase">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-black italic uppercase">הסל שלך</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-brand-cream rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500 font-bold italic">הסל שלך ריק כרגע</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-8 py-3 bg-brand-orange text-white rounded-xl font-bold italic"
                    >
                      המשיכו לקנות
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="w-24 h-24 bg-brand-cream rounded-2xl overflow-hidden shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-black italic text-lg leading-tight">{item.product.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-brand-orange mb-3">₪{item.product.price}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-brand-cream rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-white rounded-md transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold italic">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-white rounded-md transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-black italic text-brand-dark">₪{item.product.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="pt-8 border-t border-brand-dark/5 mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold italic">סה"כ לתשלום:</span>
                    <span className="text-3xl font-black italic text-brand-orange">₪{cartTotal}</span>
                  </div>
                  <button className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black italic uppercase tracking-wider hover:bg-brand-orange transition-all active:scale-95 shadow-xl">
                    מעבר לתשלום
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Nutrition Section */}
      <section id="nutrition" className="py-24 bg-brand-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black italic leading-[0.9] mb-6">ערכים <span className="text-brand-orange">תזונתיים</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">שקיפות מלאה היא המוטו שלנו. הנה כל מה שאתם צריכים לדעת על מה שאתם מכניסים לגוף.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-brand-orange/50 transition-colors group">
                <h4 className="text-2xl font-black italic mb-6 group-hover:text-brand-orange transition-colors">{product.name}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="font-bold text-gray-400">חלבון</span>
                    <span className="font-black italic text-xl">{product.protein}ג׳</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="font-bold text-gray-400">קלוריות</span>
                    <span className="font-black italic text-xl">{product.calories}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="font-bold text-gray-400">שומן רווי</span>
                    <span className="font-black italic text-lg">2.5ג׳*</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="font-bold text-gray-400">פחמימות</span>
                    <span className="font-black italic text-lg">18ג׳*</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-bold text-gray-400">סוכר מוסף</span>
                    <span className="font-black italic text-lg text-brand-orange">0ג׳</span>
                  </div>
                </div>
                <p className="mt-6 text-[10px] text-gray-500 italic">* הערכים הם משוערים ליחידה אחת של עוגייה.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Lifestyle Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-orange/30 rounded-full blur-[80px]"></div>
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000" 
                className="relative rounded-[60px] shadow-3xl z-10"
                alt="Fitness Lifestyle"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-7xl font-black italic leading-[0.9] text-brand-dark mb-8">
                לא נתנו לזה לקרות,<br />
                <span className="text-brand-orange">אז יצרנו את זה.</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-600">
                <p>
                  MUSCLE MUNCH התחיל מבעיה אחת פשוטה: כל חטיפי החלבון בשוק הרגישו כמו קרטון בטעם שוקולד. רצינו משהו שמרגיש כמו פינוק אמיתי אבל עובד בשביל הגוף שלנו.
                </p>
                <p className="font-bold text-brand-dark italic">
                  ״אנחנו מאמינים שתזונה נכונה לא צריכה להיות סבל. היא צריכה להיות הרגע הכי טוב ביום שלכם.״
                </p>
                <div className="pt-6">
                  <p className="font-black italic mb-2 tracking-tighter uppercase">עידן אטיאס</p>
                  <p className="text-sm font-bold text-brand-orange uppercase">מייסד וקונדיטור ראשי</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-brand-cream border-t-2 border-brand-dark/5">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black italic mb-4 uppercase">הצטרפו לנבחרת</h2>
          <p className="text-gray-600 mb-10">הירשמו לניוזלטר שלנו וקבלו 15% הנחה על ההזמנה הראשונה פלוס מתכונים וטיפים לאימון.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="המייל שלך..." 
              className="flex-1 px-8 py-5 bg-white border-2 border-brand-dark italic rounded-2xl focus:outline-none focus:border-brand-orange transition-colors"
            />
            <button className="px-10 py-5 bg-brand-dark text-white font-black italic uppercase rounded-2xl hover:bg-brand-orange transition-all active:scale-95 shadow-lg">
              הרשמה
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brand-dark text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <a href="#" className="text-4xl font-black tracking-tighter text-brand-orange flex items-center gap-3 mb-8">
                <Dumbbell className="w-10 h-10 rotate-[-15deg]" />
                <span className="italic uppercase">MUSCLE MUNCH</span>
              </a>
              <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                קהילה של ספורטאים ואוהבי אוכל טוב. אנחנו כאן כדי לשדרג לכם את ארוחת הביניים ולהפוך כל נשנוש לחגיגה של חלבון.
              </p>
              <div className="flex gap-4 mt-8">
                {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-xl hover:bg-brand-orange hover:scale-110 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black italic text-xl mb-6 uppercase tracking-wider">ניווט מהיר</h4>
              <ul className="space-y-4 text-gray-400 font-bold uppercase text-sm tracking-widest">
                <li><a href="#shop" className="hover:text-brand-orange mt-2 block transition-colors">החנות</a></li>
                <li><a href="#about" className="hover:text-brand-orange mt-2 block transition-colors">עלינו</a></li>
                <li><a href="#nutrition" className="hover:text-brand-orange mt-2 block transition-colors">ערכים תזונתיים</a></li>
                <li><a href="#contact" className="hover:text-brand-orange mt-2 block transition-colors">צור קשר</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black italic text-xl mb-6 uppercase tracking-wider">תמיכה</h4>
              <ul className="space-y-4 text-gray-400 font-bold uppercase text-sm tracking-widest">
                <li><a href="#" className="hover:text-brand-orange mt-2 block transition-colors">משלוחים</a></li>
                <li><a href="#" className="hover:text-brand-orange mt-2 block transition-colors">החזרות</a></li>
                <li><a href="#" className="hover:text-brand-orange mt-2 block transition-colors">שאלות נפוצות</a></li>
                <li><a href="#" className="hover:text-brand-orange mt-2 block transition-colors">נגישות</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <p>© 2024 MUSCLE MUNCH. כל הזכויות שמורות.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a>
              <a href="#" className="hover:text-white transition-colors">תנאי שימוש</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
