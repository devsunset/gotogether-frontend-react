# gotogether-frontend-react

gotogether-frontend - frontend go together (react)

http://gotogether.cf


-------------------------------------------------------


apache spa 모듈 배포시 Refresh시 404 해결 처리 법

1.htdocs (www root 경로 하위에 .htaccess파일 작성)

RewriteEngine On

RewriteBase /

RewriteRule ^index.html$ - [L]

RewriteCond %{REQUEST_FILENAME} !-f

RewriteCond %{REQUEST_FILENAME} !-d

RewriteCond %{REQUEST_FILENAME} !-l

RewriteRule . /index.html [L]


2.httpd.conf 파일 수정

  i)주석 해제 
  
  #LoadModule rewrite_module modules/mod_rewrite.so

  ii) Directory 설정 부분 하단 내용 수정
  
  AllowOverride None -> AllowOverride All

3.apache 재시작
