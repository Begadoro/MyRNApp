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
  ApiConfig, StandardResponse,
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

  executeLogin = async (email: string, password: string) : Promise<StandardResponse> => {
    try{
      const req = await this.apisauce.post("/api/auth", { email, password });
      return { ok: req.ok, status: req.status, data: req.data };
    } catch (e : any) {
      return { ok: false, status: e.status, data: e.data };
    }
  }

  executeLogout = async () : Promise<StandardResponse> => {
    try{
      const req = await this.apisauce.delete("/api/auth");
      return { ok: req.ok, status: req.status, data: req.data };
    } catch (e : any) {
      return { ok: false, status: e.status, data: e.data };
    }
  }

  checkSession = async () : Promise<StandardResponse> => {
    try{
      const req = await this.apisauce.get("/api/auth/session");
      return { ok: req.ok, status: req.status, data: req.data };
    } catch (e : any) {
      return { ok: false, status: e.status, data: e.data };
    }
  }

  getProducts = async (page: number) : Promise<StandardResponse> => {
    try {
      const req = await this.apisauce.get("/api/products", { page, limit: 10 });
      return { ok: req.ok, status: req.status, data: req.data };
    } catch (e : any) {
      return { ok: false, status: e.status, data: { message: "Something went wrong" } };
    }
  }

  getProductDetails = async (id: number) : Promise<StandardResponse> => {
    try {
      const req = await this.apisauce.get(`/api/products/${id}`);
      return { ok: req.ok, status: req.status, data: req.data };
    } catch (e : any) {
      return { ok: false, status: e.status, data: { message: "Something went wrong" } };
    }
  }

}

// Singleton instance of the API for convenience
export const api = new Api()
