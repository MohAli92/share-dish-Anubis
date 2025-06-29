# Debugging Messages Page

## المشكلة
صفحة Messages تعرض "Failed to load conversations. Please try again later."

## التغييرات المطبقة

### 1. تصحيح الـ API Endpoint
- **قبل:** `/api/chat/user/${userId}`
- **بعد:** `/api/chat/user/chats`

### 2. إضافة Debugging
- Console logs في `api.ts` لتتبع الـ requests والـ responses
- Console logs في `Messages.tsx` لتتبع الـ user والـ token
- Console logs في `fetchChats` function

## كيفية Debug

### 1. افتح Developer Tools (F12)
### 2. شوف الـ Console للـ logs التالية:

```
Environment Info:
- REACT_APP_API_URL: ...
- Current URL: ...
- Hostname: ...
- Origin: ...

API URL: ...

Messages component - User: ...
Messages component - Token: ...

Adding token to request: /api/chat/user/chats
Fetching chats for user: ...
```

### 3. تحقق من الـ Network Tab
- شوف الـ request إلى `/api/chat/user/chats`
- تحقق من الـ Authorization header
- شوف الـ response status

## الأسباب المحتملة للمشكلة

### 1. مشكلة في الـ Authentication
- الـ token غير موجود في localStorage
- الـ token منتهي الصلاحية
- الـ token غير صحيح

### 2. مشكلة في الـ API URL
- الـ API URL غير صحيح
- الـ server لا يعمل على البورت الصحيح

### 3. مشكلة في الـ Server
- الـ server لا يعمل
- مشكلة في الـ database connection
- مشكلة في الـ route handler

## الحلول

### إذا كان الـ token غير موجود:
1. تأكد من تسجيل الدخول
2. تحقق من `localStorage.getItem('token')`

### إذا كان الـ API URL غير صحيح:
1. تحقق من console.log('API URL:', API_URL)
2. تأكد من أن الـ server يعمل على البورت الصحيح

### إذا كان الـ server لا يستجيب:
1. تحقق من أن الـ server يعمل
2. تحقق من الـ database connection
3. شوف الـ server logs 