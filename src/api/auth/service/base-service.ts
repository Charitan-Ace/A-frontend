import APIClient from "@/api/client";

export abstract class BaseService {
  protected readonly client: APIClient;

  constructor(client: APIClient) {
    this.client = client;
  }
}
