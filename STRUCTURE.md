# 📝 Dependencies 
```
- element-plus  # manage template or component
- strip-js      # manage payment with real payment 
- tailwind      # style control by tailwind
- axios         # implement route calling 
- crypto-js     # hash function 
- pinia         # cache storing
- vue-router    # route managing
- uuid          # auto generate ID
- pino          # sl4j
- multer        # file configure
- mongoose      # unofficial mongo ,but easies to used (build-in some query)

```
# 📁 Structure API
###  Patter Design of Node 
``` 
sever/
├── share/ # utilities
├── insfrastructure/
    ├── file/
    ├── config/
    ├── db/
├── presentation/
    ├── routes/
    ├── middleware/
├── domain/
    ├── service/
    ├── logger/
    ├── exception/
    ├── entity/
    ├── constant/
    ├── file/
└── Dockerfile
└── Jenkinsfile
└── main.ts
``` 
###  Patter Design of VUE
``` 
src/
├── app/
    ├── utils/
    ├── component/
    ├── assets/
├── modules/
    ├── plugins/
    ├── api/
    ├── route/
    ├── layout/
    ├── store/
    ├── types/
└── App.vue
└── main.ts
```