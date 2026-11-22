---
layout: default
title: Notes
permalink: /notes/
---

# Notes

Short things I learned, written down while they're fresh. Rough on purpose.

{% assign notes = site.notes | sort: "date" | reverse %}
<ul class="list">
{% for n in notes %}
  <li><span class="date">{{ n.date | date: "%b %-d, %Y" }}</span><a href="{{ n.url | relative_url }}">{{ n.title }}</a></li>
{% endfor %}
</ul>
