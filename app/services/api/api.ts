/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
} from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  executeLogin = async (email: string, password: string) => {
    if(email.toLowerCase() === 'admin@mail.com' && password === 'admin'){
      return { data: { token: 'admin' }, ok: true, status: 200 }
    } else {
      return { data: { error: 'Wrong email or password' }, ok: false, status: 401 }
    }
  }

  getProducts = async (name: string, category: string) => {

    // Backend filter simulation
    let products = [
      {id: 1, name: "White Chair Model Y", category: "Home", price: 59, image: require("../../../assets/images/item1.png")},
      {id: 2, name: "iPhone 16 - Red (256GB)", price: 989, category: "Tech", image: require("../../../assets/images/iphone.jpg")},
      {id: 3, name: "Guess - Black Bag", price: 120, category: "Clothes", image: require("../../../assets/images/guess.jpeg")},
      {id: 4, name: "Desktop Gaming (RTX 4090)", price: 2499, category: "Tech", image: require("../../../assets/images/gaming.png")},
    ]

    if(name !== ""){
      products = products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase())
      })
    }

    if(category !== "All"){
      products = products.filter((product) => {
        return product.category.toLowerCase().includes(category.toLowerCase())
      })
    }
    // ----------------------------------

    return { data: products, ok: true, status: 200 }
  }

}

// Singleton instance of the API for convenience
export const api = new Api()
