---
layout: default
title: Writing
permalink: /writing/
---

# Writing

{% assign posts = site.writing | sort: "date" | reverse %}
<ul class="list">
{% for p in posts %}
  <li><span class="date">{{ p.date | date: "%b %-d, %Y" }}</span><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
