// firebase/firebaseAdmin.ts
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: "cimerchile",
      clientEmail: "firebase-adminsdk-fbsvc@cimerchile.iam.gserviceaccount.com",
      privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+K4tA99bSA780
j6pStvAmeYkk4n6xaR4llNvVfVbn4rKvrNJSYXjN5Wh21zV4QdURPPE5J4lho1yQ
a3JEizMjDnCdQYe1fV32qz+XX7zFWTcKETfP4MHvyiVz5GbaXh1FGiSXEinORH69
XvVBKcivXanISCRyruGM5ADNOCIGw59Fx85PmtsqbgnUkfFENweK5fXsGXgRv9+X
j5PgQ7spWgDo1WR+Js7S1vNv3m5LnpWP/YrW/p7iiFxb+1GG5lgcQ8ZonGxpxlmJ
qsDb2gZ/PRtJg35x4v1dQdmq6APIe0WU8yX2moxFA41OBlbhhdL17F2A7XnfJo1+
EXuNSdHdAgMBAAECggEAD73pBBK//JiEzmQKFFjCXlz3Jk99b1AlR7Uf0XdTp1RT
uEkVC+63okuYLyY3beH9MjUaPsHwFF4Cfo32YognToKWfd37zuE20wFv/SbWqHtv
G+068oFHbIMOQJ6qiO77e0njt4GwZjuzRhfDM4ay7xlQwZx/L+McFp6VFmfMIUUR
WZD788WFgmUbGYs/yqtULhkQTQuXquxg+BMBuJTP1Rt90WWZZv97n4WfQI+g4JYZ
Yw825FkxEP416APo1gtrkBt0mIErsbUUqEivpY22S3bVJY8yc6VGuTeoEsyo4+Vk
7WnhmEXsBS7FW5KWRpivsxYPdXVBOQMbOz+1E9SBwQKBgQD920GOOZXl5n33rlOv
xI4YPt+tMr+J1uAfqfoeWsfOnd+ADUXEmgn0TRrH5ZFJp4vqPsmVy6HO5EzOUuUL
dAd13q5oLQQZPXEiCwo1BbiBYfb/UR8ImnNROBrgr2YA6fNNs6IvMIyOT1MAwAel
D1+TN3nJqcirL+I4FLRXnEeDTQKBgQC/xp8YLPpf3n/tN4uJFpB/fHngzxAwFNZp
UKJyGJgThta2zMVt795Ac0XIn6LpdLJDcmVFndVEKd6M2Fl6UGSWqoq3qGBliRHc
Zxxfj9mETccwep4f6vw7GrSevFWe/cG8YkrsYoJAcaozQcmRKFF1yTfNMpwFjYLl
Cbb5BXYg0QKBgQD6Mi7aTkc+330nr9krUz35B37M5UeCQxWCH7U0VaS4L0Eoo+wv
aOKGtbe/bLNVNJzhsiBcUuaXUsugTnMQZrszoNWkNzni5nuqYdcdixXd7v/Rg9Ji
WFdvpSxYZobSP8Jcwr8GY4Mkf2n/Q0RFmnFIV1ThPUVZ80eynjVgY9bXwQKBgE4l
0Br36Sc78gFmixPYABYTUU8M0dnmA+FynF/GKeJ7Je/jzegYwQaecqdodeiQRzw4
14/g21Elhqz6VKwFKphC8rgYgv+dNYwM8ID4i3jggPT+YoU7KoGjRksREArz+Qid
PU7Kba15JBQzEMJ4HYnT70tM/ks8+UQAC3G6igKhAoGBALuiTmZ3kiUkbrUf2knH
M/8qgrQdEwAWBxwGdnTZaBRX4KA1kp3ZFwjzUx89f3HEeNhdf7gLJ3LwKTJqSGjr
X6BfnqNrszZQrXqcK28HPC4FMgS029nOKQrr2XjNKadRpEggSxZVlLlKHeE2qXh1
RqckMIiG7mTLVaoiFUMQcnPY
-----END PRIVATE KEY-----`,
    }),
  });
} else {
  app = getApps()[0]!;
}

export const adminDb = getFirestore(app);
