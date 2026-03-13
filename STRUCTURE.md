# Dependencies 
```
- element-plus  # manage template or component
- strip-js      # manage payment with real payment 
- tailwind      # style control by tailwind
- axios         # implement route calling 
- crypto-js     # hash function 
- pinia         # cache storing
- vue-router    # route managing
- uuid          # auto generate ID
```
# 📁 Structure API
``` 
# API
sever/
├── routes/
    ├── file/
        └── rustfs.ts # S3
    ├── payment/ 
        └── abaPayment.ts
        └── cryptoPayment.ts
        └── nowPayment.ts
        └── stripPayment.ts
    └── paths.ts # controll all routes
├── utils
    └── cryptoUtil.ts
# App
src/
├── app/
    ├── utils/
    ├── config/
    ├── plugins/
├── modules/
    ├── [module-app] 
        ├── api/
        ├── component/
        ├── layout/
        ├── views/
        ├── types/
```