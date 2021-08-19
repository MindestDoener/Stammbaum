import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const apiHttpOptions = { headers: getHeaders(), observe: 'body' as const, responseType: 'json' as const };
export const apiUrl = environment.baseApiUrl;


function getHeaders(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json').set('X-API-Key', environment.apiKey);
}