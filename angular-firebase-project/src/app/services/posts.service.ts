import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  // Ide jön a Cloud Functions URL-ed
  private getPostsUrl =
    "https://<region>-<project>.cloudfunctions.net/getPosts";
  private createPostUrl =
    "https://<region>-<project>.cloudfunctions.net/createPost";

  // A titkos kulcs az admin write-hoz
  private adminKey = "IDE_ÍRD_A_TITKOS_API_KULCSOD";

  constructor(private http: HttpClient) {}

  // Publikus read API
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.getPostsUrl);
  }

  // Admin write API
  createPost(title: string, content: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.adminKey}`,
    });
    return this.http.post(this.createPostUrl, { title, content }, { headers });
  }
}
