---
layout: default
title: Home
---

I'm moving into tech. I build small tools with AI and check carefully that they actually work, then write up what I learned.

## Featured work

{% assign featured = site.work | where: "featured", true %}
<ul class="list">
{% for item in featured %}
  <li><a href="{{ item.url | relative_url }}"><strong>{{ item.title }}</strong></a><br>{{ item.summary }}</li>
{% endfor %}
</ul>

## Latest notes

{% assign notes = site.notes | sort: "date" | reverse %}
<ul class="list">
{% for n in notes limit: 5 %}
  <li><span class="date">{{ n.date | date: "%b %-d" }}</span><a href="{{ n.url | relative_url }}">{{ n.title }}</a></li>
{% endfor %}
</ul>

[All notes →]({{ "/notes/" | relative_url }})
