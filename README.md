#Dashboard
###Launch from local machine:
<pre>
npm install -g bower
npm install -g gulp
npm install
gulp
</pre>

###Launch in Docker:
<pre>
docker build -t dashboard .
docker run -p 8000:8000 dashboard
</pre>


Webpage would be available on:
<pre>
http://localhost:8000
</pre>
