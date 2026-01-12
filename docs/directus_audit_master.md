# 🛡️ Audit Technique Directus - IAya Agency
Généré le : 2026-01-11 13:13:00

## 📦 État des Collections

### 📑 Collection : `analytics_events`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| event_type | string | select-dropdown |  |
| target_name | string | input | Ex: Bouton YouTube, Instagram... |
| target_url | text | input | L'URL de destination |
| page_source | string | input | Sur quelle page l'action a eu lieu ? |
| user_agent | string | input | Info Device/Navigateur |
| timestamp | timestamp | datetime |  |

---

### 📑 Collection : `bento_settings`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : grid_view

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| internal_name | string | input | Human reference name |
| tailwind_class | string | input | ex: col-span-4 |

---

### 📑 Collection : `bible_articles`
- **Dossier parent** : `IAya_Bible` (`IAya_Bible`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : menu_book

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| title | string | input |  |
| content | text | input-rich-text-md |  |
| category | integer | select-dropdown |  |

---

### 📑 Collection : `bible_categories`
- **Dossier parent** : `IAya_Bible` (`IAya_Bible`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : folder

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| name | string | input |  |
| color | string | select-color |  |

---

### 📑 Collection : `contacts`
- **Dossier parent** : `Racine` (`organizations`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| first_name | string | input |  |
| last_name | string | input |  |
| email | string | input |  |
| position | string | input |  |
| organization | integer | None |  |

**🔗 Relations :**
- Champ `organization` lie vers `organizations`

---

### 📑 Collection : `countries`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| name | string | input |  |
| iso_code | string | input |  |

---

### 📑 Collection : `daily_news`
- **Dossier parent** : `Daily_news_tables` (`Daily_news_tables`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| status | string | select-dropdown |  |
| image | uuid | file-image |  |
| image_name | string | input |  |
| publish_date | dateTime | datetime |  |
| translations | alias | translations |  |
| sources | alias | list-m2m |  |

**🔗 Relations :**
- Champ `image` lie vers `directus_files`

---

### 📑 Collection : `daily_news_news_items`
- **Dossier parent** : `Daily_news_tables` (`Daily_news_tables`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : import_export

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| daily_news_id | uuid | None |  |
| news_items_id | uuid | None |  |

**🔗 Relations :**
- Champ `daily_news_id` lie vers `daily_news`
- Champ `news_items_id` lie vers `news_items`

---

### 📑 Collection : `daily_news_sources`
- **Dossier parent** : `Daily_news_tables` (`Daily_news_tables`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| sort | integer | input |  |
| user_created | uuid | select-dropdown-m2o |  |
| date_created | timestamp | datetime |  |
| user_updated | uuid | select-dropdown-m2o |  |
| date_updated | timestamp | datetime |  |
| name | string | input |  |
| url | string | input |  |
| language | string | select-dropdown |  |
| daily_news_id | uuid | select-dropdown-m2o |  |
| source_type | string | select-dropdown |  |

**🔗 Relations :**
- Champ `daily_news_id` lie vers `daily_news`
- Champ `user_created` lie vers `directus_users`
- Champ `user_updated` lie vers `directus_users`

---

### 📑 Collection : `daily_news_translations`
- **Dossier parent** : `Daily_news_tables` (`Daily_news_tables`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : import_export

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| daily_news_id | uuid | None |  |
| languages_code | string | None |  |
| title | string | input |  |
| content | text | input-multiline |  |
| nexus | text | input-multiline |  |

**🔗 Relations :**
- Champ `daily_news_id` lie vers `daily_news`
- Champ `languages_code` lie vers `languages`

---

### 📑 Collection : `donaciones`
- **Dossier parent** : `Fredy` (`Fredy`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| monto | float | input |  |
| donante | string | input |  |
| contacto | string | input |  |
| status | string | input |  |

---

### 📑 Collection : `industries`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| name | string | input |  |
| code | string | input |  |

---

### 📑 Collection : `languages`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| code | string | None |  |
| name | string | None |  |
| direction | string | select-dropdown |  |

---

### 📑 Collection : `livre_or`
- **Dossier parent** : `Fredy` (`Fredy`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | bigInteger | input |  |
| nom | string | input |  |
| messsage | text | input-multiline |  |
| date | dateTime | datetime |  |
| approuve | boolean | boolean |  |
| variante | string | input |  |

---

### 📑 Collection : `news_items`
- **Dossier parent** : `Daily_news_tables` (`Daily_news_tables`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| source | uuid | select-dropdown-m2o |  |
| url | text | input-multiline |  |
| processed | boolean | boolean |  |
| published_date | timestamp | datetime |  |
| content | text | input-multiline |  |
| title | text | input |  |

**🔗 Relations :**
- Champ `source` lie vers `daily_news_sources`

---

### 📑 Collection : `organizations`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| name | string | input |  |
| logo | uuid | image |  |
| email | string | input |  |
| website | string | input |  |
| status | string | select-dropdown |  |
| industry | integer | None |  |
| country | integer | None |  |

**🔗 Relations :**
- Champ `country` lie vers `countries`
- Champ `industry` lie vers `industries`

---

### 📑 Collection : `portfolio`
- **Dossier parent** : `Portfolio` (`portfolio_group`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : work

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| slug | string | input |  |
| status | string | select-dropdown |  |
| accent_color | string | select-dropdown |  |
| main_icon | string | input |  |
| home_size | string | select-dropdown |  |
| show_on_home | boolean | boolean |  |
| related_url | string | input |  |
| sort | integer | input |  |
| main_image | uuid | file-image |  |
| illustrations | alias | files |  |

---

### 📑 Collection : `portfolio_files`
- **Dossier parent** : `Portfolio` (`portfolio_group`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : circle

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| portfolio_id | integer | None |  |
| directus_files_id | uuid | None |  |

**🔗 Relations :**
- Champ `portfolio_id` lie vers `portfolio`
- Champ `directus_files_id` lie vers `directus_files`

---

### 📑 Collection : `portfolio_services`
- **Dossier parent** : `Portfolio` (`portfolio_group`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : circle

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| portfolio_id | integer | None |  |
| services_id | integer | None |  |

**🔗 Relations :**
- Champ `portfolio_id` lie vers `portfolio`
- Champ `services_id` lie vers `services`

---

### 📑 Collection : `portfolio_sub_services`
- **Dossier parent** : `Portfolio` (`portfolio_group`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : circle

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| portfolio_id | integer | None |  |
| sub_services_id | integer | None |  |

**🔗 Relations :**
- Champ `sub_services_id` lie vers `sub_services`
- Champ `portfolio_id` lie vers `portfolio`

---

### 📑 Collection : `portfolio_translations`
- **Dossier parent** : `Portfolio` (`portfolio_group`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : translate

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| portfolio_id | integer | None |  |
| languages_code | string | None |  |
| title | string | input |  |
| excerpt | text | textarea |  |
| challenge | text | wysiwyg |  |
| solution | text | wysiwyg |  |
| results_metrics | text | input-multiline |  |

**🔗 Relations :**
- Champ `portfolio_id` lie vers `portfolio`

---

### 📑 Collection : `projects`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| title | string | input |  |
| slug | string | input | Pour l'URL du site |
| description | text | input-rich-text-html |  |
| status | string | select-dropdown |  |
| is_portfolio | boolean | boolean | Afficher sur le site IAya ? |
| tags | json | tags |  |
| cover_image | uuid | image |  |
| organization | integer | None |  |
| primary_contact | integer | None |  |
| project_illustration | uuid | file-image |  |
| translations | alias | translations |  |
| attached_docs | alias | files |  |

**🔗 Relations :**
- Champ `project_illustration` lie vers `directus_files`
- Champ `primary_contact` lie vers `contacts`
- Champ `organization` lie vers `organizations`

---

### 📑 Collection : `projects_files`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : import_export

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| projects_id | integer | None |  |
| directus_files_id | uuid | None |  |

**🔗 Relations :**
- Champ `projects_id` lie vers `projects`
- Champ `directus_files_id` lie vers `directus_files`

---

### 📑 Collection : `projects_translations`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : import_export

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| projects_id | integer | None |  |
| languages_code | string | None |  |
| content | text | input-rich-text-md |  |
| title | string | input |  |
| excerpt | text | input-multiline |  |
| slug | string | input |  |

**🔗 Relations :**
- Champ `projects_id` lie vers `projects`
- Champ `languages_code` lie vers `languages`

---

### 📑 Collection : `prospects`
- **Dossier parent** : `AIya_CRM` (`AIya_CRM`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : person_add

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| status | string | select-dropdown |  |
| language | string | select-dropdown |  |
| first_name | string | input |  |
| last_name | string | input |  |
| email | string | input |  |
| whatsapp | string | input | Contact prioritaire via WhatsApp |
| expectations | json | select-multiple-checkbox |  |
| project_description | text | textarea | Précisez vos défis ou votre vision. |

---

### 📑 Collection : `recreo_content`
- **Dossier parent** : `IAya_online` (`IAya_online`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : play_circle_filled

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| title | string | input |  |
| video_id | string | input | ID YouTube (ex: dQw4w9WgXcQ) |
| language | string | select-dropdown |  |
| publish_date | timestamp | datetime |  |
| podcast_fr | uuid | file | Podcast Français |
| podcast_es | uuid | file | Podcast Espagnol |
| podcast_en | uuid | file | Podcast Anglais |
| infographic_square | uuid | file | Infographie Carrée (1:1) |
| infographic_hor | uuid | file | Infographie Horizontale (16:9) |
| infographic_vert | uuid | file | Infographie Verticale (9:16) |

**🔗 Relations :**
- Champ `infographic_hor` lie vers `directus_files`
- Champ `infographic_square` lie vers `directus_files`
- Champ `infographic_vert` lie vers `directus_files`

---

### 📑 Collection : `recreo_files`
- **Dossier parent** : `Racine` (`recreo_content`)
- **Statut UI** : 🚫 CACHÉE
- **Icône** : insert_drive_file

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| directus_files_id | uuid | None |  |
| recreo_content_id | integer | None |  |

**🔗 Relations :**
- Champ `recreo_content_id` lie vers `recreo_content`
- Champ `directus_files_id` lie vers `directus_files`

---

### 📑 Collection : `services`
- **Dossier parent** : `servicessection` (`servicessection`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : inventory_2

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| status | string | select-dropdown |  |
| internal_name | string | input | HUMAN REFERENCE - Unique name |
| show_on_home | boolean | boolean | Display on Homepage? |
| accent_color | string | select-dropdown |  |
| sort | integer | input | Homepage sorting order |
| main_icon | string | input |  |
| main_image | uuid | file |  |
| home_size | integer | select-relational |  |
| page_size | integer | select-relational |  |
| slug | string | slug |  |
| translations | alias | translations | Interface de traduction |
| sub_services | alias | list-m2m | Liste des atomes sélectionnés |

**🔗 Relations :**
- Champ `page_size` lie vers `bento_settings`
- Champ `home_size` lie vers `bento_settings`

---

### 📑 Collection : `services_sub_services`
- **Dossier parent** : `servicessection` (`servicessection`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : link

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| services_id | integer | select-relational |  |
| sub_services_id | integer | select-relational |  |

**🔗 Relations :**
- Champ `sub_services_id` lie vers `sub_services`
- Champ `services_id` lie vers `services`

---

### 📑 Collection : `services_translations`
- **Dossier parent** : `servicessection` (`servicessection`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : translate

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| title | string | input |  |
| summary | text | textarea |  |
| full_content | text | input-rich-text-html |  |
| services_id | integer | select-relational |  |
| languages_code | string | select-relational |  |

**🔗 Relations :**
- Champ `languages_code` lie vers `languages`
- Champ `services_id` lie vers `services`

---

### 📑 Collection : `sub_services`
- **Dossier parent** : `servicessection` (`servicessection`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : category

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| status | string | select-dropdown |  |
| internal_name | string | input | HUMAN REFERENCE - Unique name |
| main_icon | string | input | SVG code or Emoji |
| main_image | uuid | file | HD image for detail page |
| featured_video | uuid | file | Short demo video |
| accent_color | string | select-dropdown |  |
| sort | integer | input | Manual sorting order |
| page_size | integer | select-relational |  |
| slug | string | slug |  |
| translations | alias | translations | Interface de traduction |

**🔗 Relations :**
- Champ `page_size` lie vers `bento_settings`

---

### 📑 Collection : `sub_services_translations`
- **Dossier parent** : `servicessection` (`servicessection`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : translate

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | numeric |  |
| title | string | input |  |
| summary | text | textarea |  |
| full_content | text | input-rich-text-html |  |
| sub_services_id | integer | select-relational |  |
| languages_code | string | select-relational |  |

**🔗 Relations :**
- Champ `languages_code` lie vers `languages`
- Champ `sub_services_id` lie vers `sub_services`

---

### 📑 Collection : `tech_commands`
- **Dossier parent** : `IAya_Bible` (`IAya_Bible`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : terminal

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| label | string | input |  |
| command | text | input-code |  |
| warning | string | input |  |

---

### 📑 Collection : `vault_secrets`
- **Dossier parent** : `vault_coffre_fort` (`vault_coffre_fort`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : lock

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| label | string | input |  |
| identifier | string | input |  |
| secret_value | string | input |  |
| service | integer | select-dropdown |  |

---

### 📑 Collection : `vault_services`
- **Dossier parent** : `vault_coffre_fort` (`vault_coffre_fort`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : dns

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| name | string | input |  |
| url | string | input |  |

---

### 📑 Collection : `directus_access`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : admin_panel_settings

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| role | uuid | None |  |
| user | uuid | None |  |
| policy | uuid | None |  |
| sort | integer | None |  |

**🔗 Relations :**
- Champ `policy` lie vers `directus_policies`
- Champ `user` lie vers `directus_users`
- Champ `role` lie vers `directus_roles`
- Champ `policy` lie vers `directus_policies`

---

### 📑 Collection : `directus_activity`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| action | string | None |  |
| user | uuid | None |  |
| timestamp | timestamp | None |  |
| ip | string | None |  |
| user_agent | text | None |  |
| collection | string | None |  |
| item | string | None |  |
| origin | string | None |  |
| revisions | alias | list-o2m |  |

**🔗 Relations :**
- Champ `user` lie vers `directus_users`

---

### 📑 Collection : `directus_collections`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : database

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| collection | string | input |  |
| icon | string | select-icon |  |
| note | text | input |  |
| display_template | string | system-display-template |  |
| hidden | boolean | boolean |  |
| singleton | boolean | boolean |  |
| translations | json | list |  |
| archive_field | string | system-field |  |
| archive_app_filter | boolean | boolean |  |
| archive_value | string | input |  |
| unarchive_value | string | input |  |
| sort_field | string | system-field |  |
| accountability | string | select-dropdown |  |
| color | string | select-color |  |
| item_duplication_fields | json | system-field-tree |  |
| sort | integer | None |  |
| group | string | None |  |
| collapse | string | None |  |
| preview_url | string | system-display-template |  |
| versioning | boolean | boolean |  |
| collection_divider | alias | presentation-divider |  |
| preview_divider | alias | presentation-divider |  |
| content_versioning_divider | alias | presentation-divider |  |
| archive_divider | alias | presentation-divider |  |
| sort_divider | alias | presentation-divider |  |
| accountability_divider | alias | presentation-divider |  |
| duplication_divider | alias | presentation-divider |  |

**🔗 Relations :**
- Champ `group` lie vers `directus_collections`

---

### 📑 Collection : `directus_comments`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| collection | string | None |  |
| item | string | None |  |
| comment | text | None |  |
| date_created | timestamp | None |  |
| date_updated | timestamp | None |  |
| user_created | uuid | None |  |
| user_updated | uuid | None |  |

**🔗 Relations :**
- Champ `user_updated` lie vers `directus_users`
- Champ `user_created` lie vers `directus_users`
- Champ `collection` lie vers `directus_collections`

---

### 📑 Collection : `directus_fields`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : input

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| collection | string | None |  |
| field | string | None |  |
| special | csv | None |  |
| interface | string | None |  |
| options | json | None |  |
| display | string | None |  |
| display_options | json | None |  |
| readonly | boolean | None |  |
| hidden | boolean | None |  |
| sort | integer | None |  |
| width | string | None |  |
| translations | json | None |  |
| note | text | None |  |
| conditions | json | None |  |
| required | boolean | None |  |
| group | string | None |  |
| validation | json | None |  |
| validation_message | text | None |  |
| searchable | boolean | None |  |

**🔗 Relations :**
- Champ `collection` lie vers `directus_collections`
- Champ `group` lie vers `directus_fields`

---

### 📑 Collection : `directus_files`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : folder

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| storage | string | input |  |
| filename_disk | string | input |  |
| filename_download | string | input |  |
| title | string | input |  |
| type | string | None |  |
| folder | uuid | None |  |
| uploaded_by | uuid | None |  |
| created_on | timestamp | datetime |  |
| modified_by | uuid | select-dropdown-m2o |  |
| modified_on | timestamp | datetime |  |
| charset | string | None |  |
| filesize | bigInteger | None |  |
| width | integer | None |  |
| height | integer | None |  |
| duration | integer | None |  |
| embed | string | None |  |
| description | text | input-multiline |  |
| location | text | input |  |
| tags | json | tags |  |
| metadata | json | None |  |
| focal_point_x | integer | None |  |
| focal_point_y | integer | None |  |
| tus_id | string | None |  |
| tus_data | json | None |  |
| uploaded_on | timestamp | None |  |
| focal_point_divider | alias | presentation-divider |  |
| storage_divider | alias | presentation-divider |  |

**🔗 Relations :**
- Champ `folder` lie vers `directus_folders`
- Champ `modified_by` lie vers `directus_users`
- Champ `uploaded_by` lie vers `directus_users`

---

### 📑 Collection : `directus_folders`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| name | string | None |  |
| parent | uuid | None |  |

**🔗 Relations :**
- Champ `parent` lie vers `directus_folders`

---

### 📑 Collection : `directus_migrations`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| version | string | None |  |
| name | string | None |  |
| timestamp | timestamp | None |  |

---

### 📑 Collection : `directus_permissions`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : admin_panel_settings

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| collection | string | None |  |
| action | string | None |  |
| permissions | json | None |  |
| validation | json | None |  |
| presets | json | None |  |
| fields | csv | None |  |
| policy | uuid | select-dropdown-m2o |  |

**🔗 Relations :**
- Champ `policy` lie vers `directus_policies`

---

### 📑 Collection : `directus_policies`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : admin_panel_settings

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| name | string | None |  |
| icon | string | select-icon |  |
| description | text | input |  |
| ip_access | csv | tags |  |
| enforce_tfa | boolean | boolean | $t:field_options.directus_policies.enforce_tfa |
| admin_access | boolean | boolean |  |
| app_access | boolean | boolean |  |
| permissions | alias | system-permissions |  |
| assigned_to_divider | alias | presentation-divider |  |
| users | alias | list-m2m |  |
| roles | alias | list-m2m |  |

---

### 📑 Collection : `directus_presets`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : bookmark

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| bookmark | string | None |  |
| user | uuid | None |  |
| role | uuid | None |  |
| collection | string | None |  |
| search | string | None |  |
| layout | string | None |  |
| layout_query | json | None |  |
| layout_options | json | None |  |
| refresh_interval | integer | None |  |
| filter | json | None |  |
| icon | string | None |  |
| color | string | None |  |

**🔗 Relations :**
- Champ `role` lie vers `directus_roles`
- Champ `user` lie vers `directus_users`

---

### 📑 Collection : `directus_relations`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : merge_type

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| many_collection | string | None |  |
| many_field | string | None |  |
| one_collection | string | None |  |
| one_field | string | None |  |
| one_collection_field | string | None |  |
| one_allowed_collections | csv | None |  |
| junction_field | string | None |  |
| sort_field | string | None |  |
| one_deselect_action | string | None |  |

---

### 📑 Collection : `directus_revisions`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| activity | integer | None |  |
| collection | string | None |  |
| item | string | None |  |
| data | json | None |  |
| delta | json | None |  |
| parent | integer | None |  |
| version | uuid | None |  |

**🔗 Relations :**
- Champ `version` lie vers `directus_versions`
- Champ `activity` lie vers `directus_activity`
- Champ `parent` lie vers `directus_revisions`

---

### 📑 Collection : `directus_roles`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : supervised_user_circle

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| name | string | input |  |
| icon | string | select-icon |  |
| description | text | input |  |
| parent | uuid | select-dropdown-m2o | $t:field_options.directus_roles.parent_note |
| children | alias | list-o2m-tree-view | $t:field_options.directus_roles.children_note |
| policies | alias | list-m2m |  |
| users_group | alias | group-raw |  |
| users_divider | alias | presentation-divider |  |
| users | alias | list-o2m |  |

**🔗 Relations :**
- Champ `parent` lie vers `directus_roles`

---

### 📑 Collection : `directus_sessions`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| token | string | None |  |
| user | uuid | None |  |
| expires | timestamp | None |  |
| ip | string | None |  |
| user_agent | text | None |  |
| share | uuid | None |  |
| origin | string | None |  |
| next_token | string | None |  |

**🔗 Relations :**
- Champ `share` lie vers `directus_shares`
- Champ `user` lie vers `directus_users`

---

### 📑 Collection : `directus_settings`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE (Singleton)
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| project_name | string | input |  |
| project_url | string | input |  |
| project_color | string | select-color | $t:field_options.directus_settings.project_color_note |
| project_logo | uuid | file | $t:field_options.directus_settings.project_logo_note |
| public_foreground | uuid | file |  |
| public_background | uuid | file |  |
| public_note | text | input |  |
| auth_login_attempts | integer | input |  |
| auth_password_policy | string | select-dropdown |  |
| storage_asset_transform | string | select-dropdown |  |
| storage_asset_presets | json | list |  |
| custom_css | text | input-code |  |
| storage_default_folder | uuid | system-folder | $t:interfaces.system-folder.field_hint |
| basemaps | json | list |  |
| mapbox_key | string | input |  |
| module_bar | json | system-modules |  |
| project_descriptor | string | input |  |
| default_language | string | system-language |  |
| custom_aspect_ratios | json | list |  |
| public_favicon | uuid | file | $t:field_options.directus_settings.project_favicon_note |
| default_appearance | string | select-dropdown |  |
| default_theme_light | string | system-theme |  |
| theme_light_overrides | json | system-theme-overrides |  |
| default_theme_dark | string | system-theme |  |
| theme_dark_overrides | json | system-theme-overrides |  |
| report_error_url | string | system-display-template |  |
| report_bug_url | string | input |  |
| report_feature_url | string | input |  |
| public_registration | boolean | boolean | $t:fields.directus_settings.public_registration_note |
| public_registration_verify_email | boolean | boolean | $t:fields.directus_settings.public_registration_verify_email_note |
| public_registration_role | uuid | select-dropdown-m2o | $t:fields.directus_settings.public_registration_role_note |
| public_registration_email_filter | json | system-filter | $t:fields.directus_settings.public_registration_email_filter_note |
| visual_editor_urls | json | list |  |
| project_id | uuid | None |  |
| mcp_enabled | boolean | boolean | $t:fields.directus_settings.mcp_enabled_note |
| mcp_allow_deletes | boolean | boolean | $t:fields.directus_settings.mcp_allow_deletes_note |
| mcp_prompts_collection | string | system-collection | $t:fields.directus_settings.mcp_prompts_collection_note |
| mcp_system_prompt_enabled | boolean | boolean | $t:fields.directus_settings.mcp_system_prompt_enabled_note |
| mcp_system_prompt | text | input-rich-text-md | $t:fields.directus_settings.mcp_system_prompt_note |
| project_owner | string | system-owner |  |
| project_usage | string | None |  |
| org_name | string | None |  |
| product_updates | boolean | None |  |
| project_status | string | None |  |
| ai_openai_api_key | text | input-hash |  |
| ai_anthropic_api_key | text | input-hash |  |
| ai_system_prompt | text | input-rich-text-md | $t:fields.directus_settings.ai_system_prompt_note |
| modules_divider | alias | presentation-divider |  |
| visual_editor_divider | alias | presentation-divider |  |
| security_divider | alias | presentation-divider |  |
| public_registration_divider | alias | presentation-divider |  |
| files_divider | alias | presentation-divider |  |
| reporting_divider | alias | presentation-divider |  |
| map_divider | alias | presentation-divider |  |
| image_editor | alias | presentation-divider |  |
| theming_group | alias | group-raw |  |
| branding_divider | alias | presentation-divider |  |
| theming_divider | alias | presentation-divider |  |
| ai_group | alias | group-raw |  |
| ai_divider | alias | presentation-divider |  |
| ai_notice | alias | presentation-notice |  |
| mcp_divider | alias | presentation-divider |  |
| mcp_notice | alias | presentation-notice |  |
| mcp_prompts_collection_validation | alias | system-mcp-prompts-collection-validation |  |
| mcp_system_prompt_divider | alias | presentation-divider |  |

**🔗 Relations :**
- Champ `public_registration_role` lie vers `directus_roles`
- Champ `public_favicon` lie vers `directus_files`
- Champ `storage_default_folder` lie vers `directus_folders`
- Champ `public_background` lie vers `directus_files`
- Champ `public_foreground` lie vers `directus_files`
- Champ `project_logo` lie vers `directus_files`

---

### 📑 Collection : `directus_users`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : people_alt

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | input |  |
| first_name | string | input |  |
| last_name | string | input |  |
| email | string | input |  |
| password | hash | input-hash |  |
| location | string | input |  |
| title | string | input |  |
| description | text | input-multiline |  |
| tags | json | tags |  |
| avatar | uuid | file |  |
| language | string | system-language |  |
| tfa_secret | string | system-mfa-setup |  |
| status | string | select-dropdown |  |
| role | uuid | select-dropdown-m2o |  |
| token | string | system-token |  |
| last_access | timestamp | None |  |
| last_page | string | None |  |
| provider | string | select-dropdown |  |
| external_identifier | string | input |  |
| auth_data | json | None |  |
| email_notifications | boolean | boolean |  |
| appearance | string | select-dropdown |  |
| theme_dark | string | system-theme |  |
| theme_light | string | system-theme |  |
| theme_light_overrides | json | system-theme-overrides |  |
| theme_dark_overrides | json | system-theme-overrides |  |
| text_direction | string | select-dropdown |  |
| preferences_divider | alias | presentation-divider |  |
| theming_divider | alias | presentation-divider |  |
| admin_divider | alias | presentation-divider |  |
| policies | alias | list-m2m |  |

**🔗 Relations :**
- Champ `role` lie vers `directus_roles`
- Champ `avatar` lie vers `directus_files`

---

### 📑 Collection : `directus_webhooks`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| name | string | input |  |
| method | string | select-dropdown |  |
| url | string | input |  |
| status | string | select-dropdown |  |
| data | boolean | boolean |  |
| actions | csv | select-multiple-checkbox |  |
| collections | csv | system-collections |  |
| headers | json | list |  |
| was_active_before_deprecation | boolean | None |  |
| migrated_flow | uuid | None |  |
| triggers_divider | alias | presentation-divider |  |

**🔗 Relations :**
- Champ `migrated_flow` lie vers `directus_flows`

---

### 📑 Collection : `directus_dashboards`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| name | string | None |  |
| icon | string | None |  |
| note | text | None |  |
| date_created | timestamp | None |  |
| user_created | uuid | None |  |
| color | string | None |  |
| panels | alias | None |  |

**🔗 Relations :**
- Champ `user_created` lie vers `directus_users`

---

### 📑 Collection : `directus_panels`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| dashboard | uuid | None |  |
| name | string | None |  |
| icon | string | None |  |
| color | string | None |  |
| show_header | boolean | None |  |
| note | text | None |  |
| type | string | None |  |
| position_x | integer | None |  |
| position_y | integer | None |  |
| width | integer | None |  |
| height | integer | None |  |
| options | json | None |  |
| date_created | timestamp | None |  |
| user_created | uuid | None |  |

**🔗 Relations :**
- Champ `user_created` lie vers `directus_users`
- Champ `dashboard` lie vers `directus_dashboards`

---

### 📑 Collection : `directus_notifications`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | integer | None |  |
| timestamp | timestamp | None |  |
| status | string | None |  |
| recipient | uuid | None |  |
| sender | uuid | None |  |
| subject | string | None |  |
| message | text | None |  |
| collection | string | None |  |
| item | string | None |  |

**🔗 Relations :**
- Champ `sender` lie vers `directus_users`
- Champ `recipient` lie vers `directus_users`

---

### 📑 Collection : `directus_shares`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : share

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| name | string | None |  |
| collection | string | None |  |
| item | string | None |  |
| role | uuid | select-dropdown-m2o |  |
| password | hash | input-hash | $t:shared_leave_blank_for_passwordless_access |
| user_created | uuid | select-dropdown-m2o |  |
| date_created | timestamp | None |  |
| date_start | timestamp | None | $t:shared_leave_blank_for_unlimited |
| date_end | timestamp | None | $t:shared_leave_blank_for_unlimited |
| times_used | integer | None |  |
| max_uses | integer | None | $t:shared_leave_blank_for_unlimited |

**🔗 Relations :**
- Champ `user_created` lie vers `directus_users`
- Champ `role` lie vers `directus_roles`
- Champ `collection` lie vers `directus_collections`

---

### 📑 Collection : `directus_flows`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| name | string | None |  |
| icon | string | None |  |
| color | string | None |  |
| description | text | None |  |
| status | string | None |  |
| trigger | string | None |  |
| accountability | string | None |  |
| options | json | None |  |
| operation | uuid | None |  |
| date_created | timestamp | None |  |
| user_created | uuid | None |  |
| operations | alias | None |  |

**🔗 Relations :**
- Champ `user_created` lie vers `directus_users`
- Champ `operation` lie vers `directus_operations`

---

### 📑 Collection : `directus_operations`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| name | string | None |  |
| key | string | None |  |
| type | string | None |  |
| position_x | integer | None |  |
| position_y | integer | None |  |
| options | json | None |  |
| resolve | uuid | None |  |
| reject | uuid | None |  |
| flow | uuid | None |  |
| date_created | timestamp | None |  |
| user_created | uuid | None |  |

**🔗 Relations :**
- Champ `user_created` lie vers `directus_users`
- Champ `flow` lie vers `directus_flows`
- Champ `reject` lie vers `directus_operations`
- Champ `resolve` lie vers `directus_operations`

---

### 📑 Collection : `directus_translations`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| language | string | system-language |  |
| key | string | input |  |
| value | text | input-multiline |  |

---

### 📑 Collection : `directus_versions`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| id | uuid | None |  |
| key | string | None |  |
| name | string | None |  |
| collection | string | None |  |
| item | string | None |  |
| hash | string | None |  |
| date_created | timestamp | None |  |
| date_updated | timestamp | None |  |
| user_created | uuid | None |  |
| user_updated | uuid | None |  |
| delta | json | None |  |

**🔗 Relations :**
- Champ `user_updated` lie vers `directus_users`
- Champ `user_created` lie vers `directus_users`
- Champ `collection` lie vers `directus_collections`

---

### 📑 Collection : `directus_extensions`
- **Dossier parent** : `Racine` (`None`)
- **Statut UI** : ✅ VISIBLE
- **Icône** : None

| Champ | Type | Interface | Note |
| :--- | :--- | :--- | :--- |
| enabled | boolean | None |  |
| id | uuid | None |  |
| folder | string | None |  |
| source | string | None |  |
| bundle | uuid | None |  |

---
