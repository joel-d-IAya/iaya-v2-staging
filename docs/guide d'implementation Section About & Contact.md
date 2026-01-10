# **🛠️ Guide d'Implémentation : Section About & Contact**

Destinataires : TechBoss (Stack & Logic), Anty (Styling & Layout)  
Objectif : Traduire le "Soul" du projet en "Physics" d'interface.

## **1\. STRUCTURE BENTO & HIÉRARCHIE (Layout Physics)**

La mise en page utilise un système de **Bento Grid Asymétrique** sur une base de 12 colonnes.

### **A. Homepage (Intro Section)**

* **Type :** Bento-Hero (Asymétrique).  
* **Configuration :**  
  * **Bloc Gauche (60%) :** Texte trilingue \+ CTA principal.  
  * **Bloc Droit (40%) :** Portrait de Joel (voir section Images).  
  * **Bloc Social Impact (Full Width) :** Une carte horizontale fine agissant comme un ruban de confiance.

### **B. Homepage & Page Dédiée : "El Nexo" (Le Formulaire)**

* **Position :** Directement intégré en bas de la Homepage et en fin de page "Origen".  
* **Type :** Bento-Full ou Bento-Large.  
* **Design :** Fond sombre (oklch(0.18 0.01 240)), bordure accentuée pour signaler la zone interactive.

### **C. Page Dédiée "Origen" (Storytelling)**

* **Manifeste (Large) :** Bento-Double (occupant 2/3). Typographie large, interlignage généreux.  
* **Piliers DNA (Triple) :** Trois carrés Bento-Small (1/3 chacun) avec icônes Lucide.  
* **Team (Grid) :** Grille de cartes Bento-Square uniformes pour les Gems \+ 1 carte "Recherche Associé" de type Bento-Tall.

## **2\. ICONOGRAPHIE & SYMBOLISME (Visual Language)**

Utiliser la bibliothèque lucide-react. Couleurs en **OKLCH**.

| Section | Icône Lucide | Couleur OKLCH | Signification |
| :---- | :---- | :---- | :---- |
| **Anclaje Local** | MapPin | oklch(0.65 0.18 45\) | Ancrage, Cuenca, Terre. |
| **Enfoque Humano** | HeartHandshake | oklch(0.70 0.15 160\) | Empathie, Proximité. |
| **Engagement ONG** | Globe | oklch(0.80 0.10 200\) | Impact global/local. |
| **Automatisation** | Zap | oklch(0.85 0.20 90\) | Vitesse, Flux. |
| **WhatsApp / Nexo** | MessageCircle | oklch(0.70 0.15 160\) | Communication directe. |

## **3\. STRATÉGIE D'IMAGERIE (Asset Blueprint)**

### **Image 1 : Le Portrait de Renaissance (Hero)**

* **Position :** Homepage & Page About.  
* **Aspect Ratio :** 4:5.  
* **Prompt :** Cinematic portrait of a mature creative director, warm natural lighting, blurred Cuenca cathedral background, minimalist professional attire, high fidelity, authentic skin texture.

### **Image 2 : L'Ancrage Local (Background)**

* **Contenu :** Texture de pierre coloniale de Cuenca fusionnée avec des réseaux de neurones numériques.

## **4\. SCHÉMA DU FORMULAIRE (Data Architecture pour TechBoss)**

Le formulaire doit être pragmatique et structuré pour la base de données.

### **A. Champs de Capture**

1. **first\_name** (Texte) : "Comment vous appelez-vous ? (Prénom)"  
2. **last\_name** (Texte) : "Nom"  
3. **email** (Email) : "Votre email de confiance"  
4. **whatsapp** (Tel) : "Téléphone (WhatsApp)" \- *Logique : Ajouter \+593 par défaut.*

### **B. Attentes (Checkboxes \- Multi-sélection)**

L'utilisateur doit pouvoir cocher plusieurs options :

* opt\_transform : Transformer entreprise/ONG avec l'IA.  
* opt\_agent : Créer un agent IA spécifique.  
* opt\_auto : Automatiser des flux internes.  
* opt\_rag : Développer un RAG (Analyse documents).  
* opt\_train : Formations et ateliers.  
* opt\_audit : Audit interne / Gain de temps.  
* opt\_talk : Intervention séminaire.  
* opt\_web : Site internet / App mobile.  
* opt\_vision : Discussion impact IA sur Cuenca.  
* opt\_other : Autre.

### **C. Message (Text Area)**

* **Label :** "Décrivez avec précision vos défis ou votre vision..."  
* **Placeholder :** "La sincérité est notre base."

## **5\. LOGIQUE D'INTERACTION & WORKFLOW**

1. **Switch i18n :** Traduction instantanée des labels et des noms de services dans les checkboxes.  
2. **Intégration n8n :** \* Soumission via POST vers le webhook https://n8nflow.iaya.cloud/webhook/nexo\_lead.  
   * Payload JSON : { "first\_name": "", "last\_name": "", "whatsapp": "", "interests": \[\], "message": "" }.  
3. **UX Confirmation :** "Message reçu, Joel vous répondra personnellement sur WhatsApp ou par Email."  
4. **Bento Hover :** Effet de "Glow" subtil sur les bordures du formulaire lors de la saisie.

Signé :  
DiayaVinci \- Art Director