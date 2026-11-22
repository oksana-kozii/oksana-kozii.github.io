---
layout: default
title: Tags
permalink: /tags/
---

# Tags

{% assign docs = site.work | concat: site.writing | concat: site.notes %}
{% assign all_tags = docs | map: "tags" | join: "," | split: "," | uniq | sort %}

{% for t in all_tags %}
<h2 id="{{ t | slugify }}">#{{ t }}</h2>
<ul class="list">
  {% for d in docs %}{% if d.tags contains t %}
  <li><a href="{{ d.url | relative_url }}">{{ d.title }}</a> <span class="date">{{ d.collection }}</span></li>
  {% endif %}{% endfor %}
</ul>
{% endfor %}
