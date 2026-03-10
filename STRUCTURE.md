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
        └── rustfs.js # S3
    ├── payment/ 
        └── abaPayment.js
        └── cryptoPayment.js
        └── nowPayment.js
        └── stripPayment.js
    └── paths.js # controll all routes
├── utils
    └── cryptoUtil.js
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