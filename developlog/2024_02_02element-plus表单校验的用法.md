## element-plus表单校验的用法
#### element-plus的表单校验所使用的校验库
async-validator  
#### 用法
基本用法:  
1. 定义一个descriptor,将其赋值给一个schema,
2. 将带验证的对象和一个回调方法传入给schema的validate方法
#### descriptor
descriptor中定义一个待验证对象的字段的验证内容,  
在descriptor中定义一个待验证对象的字段数组:  

```javascript
[
    name:[
        {
            type:'string',
            message:'验证错误信息'
        }
    ]
]
```
对于单个字段有多个验证规则时，可以给该字段设置一个规则数组:  
```javascript
[
    name:[
        {
            type:'string',
            message:'验证错误信息'
        },
        {
            validator:(rule,value,callback,source,optons)=>{}
        }
    ]
]
```