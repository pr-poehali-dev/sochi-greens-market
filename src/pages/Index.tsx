import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Руккола свежая',
    description: 'Ароматные листья с легкой пикантной ноткой',
    price: 350,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/433a69eb-c286-49d1-83ad-81aba95dc8a1/files/b0e2ae77-dffe-491a-bbff-3fa12c1aac0d.jpg',
    badge: 'Хит'
  },
  {
    id: 2,
    name: 'Салат Айсберг',
    description: 'Хрустящие сочные листья для салатов',
    price: 280,
    weight: '200г',
    image: 'https://cdn.poehali.dev/projects/433a69eb-c286-49d1-83ad-81aba95dc8a1/files/de22744e-d94a-4415-9316-93d5bdaad279.jpg'
  },
  {
    id: 3,
    name: 'Микс салатов',
    description: 'Композиция из 5 видов зелени премиум качества',
    price: 450,
    weight: '150г',
    image: 'https://cdn.poehali.dev/projects/433a69eb-c286-49d1-83ad-81aba95dc8a1/files/b0e2c5ba-8118-4004-ab60-ed50fb886e2d.jpg',
    badge: 'Новинка'
  },
  {
    id: 4,
    name: 'Шпинат молодой',
    description: 'Нежные листочки богатые витаминами',
    price: 320,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/433a69eb-c286-49d1-83ad-81aba95dc8a1/files/b0e2ae77-dffe-491a-bbff-3fa12c1aac0d.jpg'
  },
  {
    id: 5,
    name: 'Салат Романо',
    description: 'Классический салат для традиционных рецептов',
    price: 290,
    weight: '200г',
    image: 'https://cdn.poehali.dev/projects/433a69eb-c286-49d1-83ad-81aba95dc8a1/files/de22744e-d94a-4415-9316-93d5bdaad279.jpg'
  },
  {
    id: 6,
    name: 'Базилик зеленый',
    description: 'Ароматная зелень для средиземноморских блюд',
    price: 180,
    weight: '50г',
    image: 'https://cdn.poehali.dev/projects/433a69eb-c286-49d1-83ad-81aba95dc8a1/files/b0e2c5ba-8118-4004-ab60-ed50fb886e2d.jpg'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Leaf" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-foreground">Зелень Сочи</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveSection('catalog')}
              className={`font-medium transition-colors hover:text-primary ${
                activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Каталог
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`font-medium transition-colors hover:text-primary ${
                activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              О нас
            </button>
            <button
              onClick={() => setActiveSection('delivery')}
              className={`font-medium transition-colors hover:text-primary ${
                activeSection === 'delivery' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Доставка
            </button>
            <button
              onClick={() => setActiveSection('contacts')}
              className={`font-medium transition-colors hover:text-primary ${
                activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Контакты
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Корзина пуста
                  </p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.price} ₽ × {item.quantity}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого:</span>
                        <span className="text-2xl font-bold text-primary">{total} ₽</span>
                      </div>
                      <Button className="w-full" size="lg" asChild>
                        <a href="https://t.me/rasada193_bot" target="_blank" rel="noopener noreferrer">Оформить заказ</a>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Свежая зелень из Сочи
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Выращена с любовью на экологически чистых полях. Собрана утром и доставлена в тот же день
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        {product.weight}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {product.price} ₽
                    </span>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            <div className="prose prose-lg">
              <p className="text-lg text-muted-foreground mb-4">
                Мы — семейная ферма в Сочи, которая уже более 10 лет выращивает свежую зелень по экологическим стандартам.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Наши поля расположены в экологически чистом районе, где используются только натуральные удобрения и современные методы органического земледелия.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <Icon name="Leaf" className="text-primary mb-2" size={32} />
                    <CardTitle>100% Эко</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Без химии и пестицидов</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Icon name="Truck" className="text-primary mb-2" size={32} />
                    <CardTitle>Быстрая доставка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">В день сбора урожая</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Icon name="Heart" className="text-primary mb-2" size={32} />
                    <CardTitle>С любовью</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Каждый листочек под контролем</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'delivery' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Доставка</h2>
            <Card>
              <CardHeader>
                <CardTitle>Условия доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Зона доставки</h4>
                    <p className="text-muted-foreground">Доставляем по всему раздольному </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Время доставки</h4>
                    <p className="text-muted-foreground">
                      С 9:00 до 20:00 ежедневно. Доставка в день заказа при заказе до 14:00
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Banknote" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Стоимость</h4>
                    <p className="text-muted-foreground">Бесплатно при заказе от 500 ₽.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CreditCard" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Оплата</h4>
                    <p className="text-muted-foreground">
                      Наличными курьеру или картой онлайн (готовим интеграцию)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Контакты</h2>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-3">
                  <Icon name="Phone" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <a href="tel:+79001234567" className="text-lg text-primary hover:underline">+7(999)6528355</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:info@zelen-sochi.ru" className="text-lg text-primary hover:underline">
                      info@zelen-sochi.ru
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г.сочи Тепличная 75.1 </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="MessageCircle" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Мессенджеры</h4>
                    <div className="flex gap-3 mt-2">
                      <Button variant="outline" size="sm">WhatsApp</Button>
                      <Button variant="outline" size="sm" asChild>Telegram </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-muted mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Leaf" className="text-primary" size={24} />
            <span className="text-xl font-bold">Зелень Сочи</span>
          </div>
          <p className="text-muted-foreground mb-2">
            Свежая зелень с любовью из экологически чистых полей
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 Зелень Сочи. Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
}