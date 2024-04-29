# Step per Replicare il Deploy

## 1. Aggiustare il bottone di redirect per reindirizzare a `/routes`

## 2. APPURARE il DocumentRoot di Apache, e sostituirlo nel file di qui sotto

```apache
<VirtualHost *:80> # < -- IN TEORIA VERIFICA LA PORTA, MA PENSO SIA 80
    ServerName localhost
    DocumentRoot "C:/xampp/htdocs"  # < -- QUI
    <Directory "C:/xampp/htdocs">   # < -- E ANCHE QUI
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
    </Directory>

    <Location /routes>
        ProxyPass http://localhost:3000
        ProxyPassReverse http://localhost:3000
    </Location>

    <Location /_next>
        ProxyPass http://localhost:3000/_next
        ProxyPassReverse http://localhost:3000/_next
    </Location>

    <Location /map>
        ProxyPass http://localhost:3000/map
        ProxyPassReverse http://localhost:3000/map
    </Location>

    <Location /marker>
        ProxyPass http://localhost:3000/marker
        ProxyPassReverse http://localhost:3000/marker
    </Location>
</VirtualHost>
```

## 3. Nella sezione dei moduli di Apache, assicurarsi che i seguenti moduli siano abilitati

```apache
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```
