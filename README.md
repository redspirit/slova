# slova
Генератор статического блога для Github Actions

Есть 2 режима использование:
- Github Actions
- Установка npm-пакета


## Github Actions

Добавьте в ваш workflow дополнительный шаг перед публикацией в Github Pages:

```yaml
      - name: Slova generate HTML
        uses: redspirit/slova@v1.16
        with:
          context: blog.yml
          path: './dist/'
```

### Конфигурация:
В параметры `with` можно передать следующие значения:

- `context` - путь до yaml-файла, который содержит дополнительный контекст для вашего сайта
- `path` - директория, куда будут сложены итоговые HTML-файлы сайта
- `pages` - директория, которая содержит .md файлы сайта
- `theme` - директория с файлами шаблона
