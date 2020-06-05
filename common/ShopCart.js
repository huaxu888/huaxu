class ShopCart {
	constructor(shopCart, instance) {
		this.shopCart = shopCart
		this.instance = instance
	}
	
	static getInstance() {
		if (arguments.length === 0) {
			if (!this.instance) {
				this.instance = new ShopCart('', true)
			}
			return this.instance
		} else {
			console.log(arguments[0]);
			this.instance = new ShopCart(arguments[0], true)
			return this.instance
		}
	}
}

export default ShopCart