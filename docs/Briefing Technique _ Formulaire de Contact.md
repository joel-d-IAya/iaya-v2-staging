# **📝 Briefing Technique : Formulaire de Contact IAya V2.0**

Ce document définit les spécifications pour l'intégration du formulaire de contact du site IAya V2.0 avec le CMS Directus.

## **1\. Endpoint & Authentification**

* **URL de l'API** : https://cms.iaya.cloud/items/prospects  
* **Méthode HTTP** : POST  
* **Authentification** : Aucune (le rôle **Public** est configuré pour autoriser la création d'items dans cette collection).

## **2\. Mapping des Champs (Payload JSON)**

Le formulaire doit envoyer un objet JSON correspondant aux clés de champs configurées dans Directus.

| Label UI (FR) | Clé JSON (Directus) | Type de donnée | Notes |
| :---- | :---- | :---- | :---- |
| Prénom | first\_name | string | Requis |
| Nom | last\_name | string | Requis |
| Email | email | string | Format email valide |
| Téléphone (WhatsApp) | whatsapp | string | Préciser l'usage prioritaire |
| Attentes (Cases à cocher) | expectations | array (JSON) | Voir valeurs ci-dessous |
| Description du projet | project\_description | text | Champ libre (textarea) |
| Langue (Caché) | language | string | fr-FR, es-ES ou en-US |

### **Détails pour expectations (Multi-sélection)**

Le champ expectations doit recevoir un tableau de chaînes de caractères correspondant aux valeurs techniques suivantes :

* transform\_ia : Transformer l'entreprise avec l'IA  
* agent\_ia : Créer un agent IA spécifique  
* automation : Automatiser les flux internes  
* rag : Développer un RAG (Analyse docs)  
* training : Formations et ateliers  
* audit : Audit et Rendez-vous  
* seminar : Intervention séminaire  
* dev\_web : Site web / App mobile  
* cuenca\_chat : Discussion futur Cuenca  
* other : Autre

## **3\. Gestion de la Langue (Champ Caché)**

Le champ language doit être automatiquement rempli en fonction de la langue de navigation actuelle de l'utilisateur sur le site (ex: fr-FR). Cela permettra au CRM de segmenter les prospects par langue pour le suivi.

## **4\. Comportement au Submit (Double Action)**

Lors de la soumission du formulaire, Anty doit implémenter deux actions consécutives :

### **A. Injection API (Silencieuse)**

Effectuer l'appel POST vers Directus. En cas de succès, afficher un message de confirmation à l'utilisateur (ou une redirection).

### **B. Génération du Mailto**

Déclencher l'ouverture du client mail de l'utilisateur avec les données pré-remplies.

* **Destinataires** : joel.devalez@gmail.com; joel@iaya.cloud  
* **Sujet** : Nouveau Contact IAya \- \[Prénom\] \[Nom\]  
* **Corps du mail** : Inclure le récapitulatif des attentes et la description du projet.

## **5\. Exemple de Payload JSON**

{  
  "first\_name": "Jean",  
  "last\_name": "Dupont",  
  "email": "jean.dupont@example.com",  
  "whatsapp": "+33612345678",  
  "language": "fr-FR",  
  "expectations": \["automation", "rag", "audit"\],  
  "project\_description": "Besoin d un audit pour automatiser la gestion documentaire."  
}

*Note pour Anty : La collection prospects est située dans le dossier AIya\_CRM (ID: 59a98701-...). Les permissions de création sont déjà ouvertes pour l'agent public.*