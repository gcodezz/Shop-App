# ALL OF US



# App Details
 Shop app is a simple online store where you can purchase and also sell all your electronics, as well as books, home appliances, kiddies items, fashion items for men, women, and children; cool gadgets, computers, groceries, automobile parts, and more on the go. We provide you with a wide range of products you can trust. Take part in the deals of the day and discover the best prices on a wide range of products.

The app will consist of:

    └──Log-In Screen

    └──Sign-Up Screen

    └──Startup Screen

    └──Products Overview Screen

    └──Product Detail Screen

    └──Cart Screen

    └──Orders Screen

    └──Edit Product Screen

    └──User Products Screen



# Proposed Stack

JavaScript (React Native)


# Top-level directory layout

    📦shopApp
        📦assets
            ┣ 📜icon.png
            ┗ 📜splash.png
        📦components
            ┣ 📦Shop
                ┣ 📜CartItem.js
                ┣ 📜NotificationDesign.js
                ┣ 📜OrderItem.js
                ┗ 📜ProductItem.js
            ┗ 📦UI
                ┣ 📜Card.js
                ┣ 📜HeaderButton.js
                ┗ 📜Input.js
        📦constants
            ┗ 📜dummy-data.js
        📦data
            ┗ 📜Colors.js
        📦models
            ┣ 📜cart-item.js
            ┣ 📜order.js
            ┗ 📜product.js
        📦models
            ┣ 📜cart-item.js
            ┣ 📜order.js
            ┗ 📜product.js
        📦navigation
            ┣ 📜NavigationContainer.js
            ┗ 📜ShopAppNavigation.js
        📦screens
            ┣ 📦shop
                ┣ 📜CartScreen.js
                ┣ 📜OrdersScreen.js
                ┣ 📜ProductDetailScreen.js
                ┗ 📜ProdyctsOverview.js
            ┣ 📦user
                ┣ 📜AuthScreen.js
                ┣ 📜EditProductScreen.js
                ┣ 📜UserProductsScreen.js
                ┗ 📜StartupScreen.js
            ┗ 📜StartupScreen.js
        📦store
            ┣ 📦actions
                ┣ 📜auth.js
                ┣ 📜cart.js
                ┣ 📜order.js
                ┗ 📜products.js
            ┗ 📦reducers
                ┣ 📜auth.js
                ┣ 📜cart.js
                ┣ 📜order.js
                ┗ 📜products.js
        ┣ 📜App.js
        ┣ 📜app.json
        ┣ 📜babel.config.js
        ┣ 📜package-lock.json
        ┣ 📜package.json
        ┣ 📜README.md
        ┗ 📜yarn.lock


# How to setup project and run locally

### Clone the repository 

```
git clone https://github.com/gcodezz/Shop-App.git

```

### Install all dependencies

Using npm

```
npm install
```

### Start watching the file and changes

Using npm

```
npm start --reset-cache
```

### Install Expo on your device using this link

Expo for Android

```
https://play.google.com/store/apps/details?id=host.exp.exponent
```

Expo for IOS

```
https://itunes.com/apps/exponent/
```
### Start the react native bundler to test project on your device

Using npm

```
npm start
```

Using expo

```
expo start
```