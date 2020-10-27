import { ID } from "../../promat-web-shared/types/general";
import { CaseCreateRequest, CaseResponse, CaseUpdateRequest } from "../../promat-web-shared/types/case";
import { UserListItem } from "../../promat-web-shared/types/user";
import { RecordListItem } from "../../promat-web-shared/types/record";

const BASE_URL = "http://localhost:3000"; // Get from env

enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

function createRequest(
  path: string,
  method: HTTPMethod = HTTPMethod.GET,
  options: {
    queryParams?: { [key in string]: string };
    body?: any;
    headers?: { [key in string]: string };
  } = {}
): Request {
  const { queryParams, body, headers } = options;
  const url = new URL(BASE_URL + path);
  if (queryParams) {
    url.search = new URLSearchParams(queryParams).toString();
  }
  return new Request(url.toString(), {
    method,
    credentials: "same-origin",
    headers: headers,
    body: body && JSON.stringify(body),
  });
}

async function executeRequest<T>(request: Request): Promise<T> {
  const response = await fetch(request);
  if (response.status >= 400) {
    throw new Error(`HTTP Error ${response.status}`);
  }
  const body = await response.json();
  return body;
}

export default {
  async getCase(id: ID): Promise<CaseResponse> {
    const path = `/cases/${id}`;
    const request = createRequest(path);
    const result = await executeRequest<CaseResponse>(request);
    return result;
  },
  async updateCase(id: ID, body: CaseUpdateRequest): Promise<CaseResponse> {
    const path = `/cases/${id}`;
    const request = createRequest(path, HTTPMethod.PUT, { body });
    const result = await executeRequest<CaseResponse>(request);
    return result;
  },

  async createCase(body: CaseCreateRequest): Promise<CaseResponse> {
    const path = `/cases`;
    const request = createRequest(path, HTTPMethod.POST, { body });
    const result = await executeRequest<CaseResponse>(request);
    return result;
  },
  async getReviwers(): Promise<UserListItem[]> {
    const path = `/reviewers`;
    const request = createRequest(path);
    const result = await executeRequest<UserListItem[]>(request);
    return result;
  },
  async searchRecords(query: string): Promise<RecordListItem[]> {
    const path = `/records`;
    const queryParams = { id: query };
    const request = createRequest(path, HTTPMethod.GET, { queryParams });
    const result = await executeRequest<RecordListItem[]>(request);
    return result;
  },
};
