## TreballGrup
Alberto Bonilla Abad
Leah Garcia Jimenez

### Introducció

A l’assignatura de Disseny Conceptual de Videojocs vam dissenyar un videojoc ambientat en un escenari distòpic, on Donald Trump i els seus aliats volen destruir el món. Dels diversos minijocs que vam desenvolupar, vam triar el de la desforestació, protagonitzat per Javier Milei amb una motoserra entregada per Elon Musk.
L’objectiu del projecte era crear un joc simple però amb càrrega crítica, combinant mecàniques ràpides amb un rerefons humorístic i polític.

### Disseny del joc

El minijoc adopta el format de clicker, on el jugador ha de clicar ràpidament sobre branques d’arbres per talar-les abans que s’acabi el temps. 
Cada cop que es completa un arbre, s’afegeix temps extra, permetent continuar. 
A mesura que s’avança, comencen a aparèixer branques seques: si es clica alguna per error, es penalitza amb una reducció de temps.
El ritme de joc augmenta progressivament i obliga el jugador a distingir entre branques útils i perilloses, afegint un component d’atenció i rapidesa dins d’una mecànica senzilla.

### Parts rellevants de la implementació

Hi ha un intent molt aconseguit d'encapsulament
resources.js emagatzema variables importants del joc com l'estat en el que es troba (pausat, finalitzat)
El funcionament de les branques es similar al de les cartes, canvien de sprite quan son clicades.
score.js i timer.js son els managers dels respectius marcadors


### Conclusions

Algun dels problemes que hem tingut podrien ser ajustar la mida dels assets perquè encaixessin correctament dins l’escena i mantenir una proporció visual coherent. 
També hem tingut dificultats a l’hora de definir bé les hitboxes de les branques, de manera que la detecció de clics fos precisa, però justa per al jugador.


### Manual d’usuari

#### Objectiu del joc
Talar el màxim nombre d’arbres possibles abans que s’acabi el temps, evitant errors que penalitzin el temps.
#### Controls
- Ratolí: clic esquerre sobre les branques per talar-les.
- Botó de pausa: obre una pantalla de pausa. Per continuar la partida, cal prémer el mateix botó una altra vegada.
- Botó de Return: permet sortir del joc i tornar a la pantalla inicial.

#### Normes bàsiques
- Clica sobre les branques verdes per eliminar-les. Quan no en quedi cap, l’arbre es considera complet i s’afegeix temps extra.
- A partir d’un cert moment apareixen branques seques. Si es clica alguna d’aquestes, es redueix el temps disponible.
- El joc acaba quan el temps arriba a zero.

#### Consells
- Evita clicar de manera impulsiva: les branques seques penalitzen.
- Pots pausar el joc en qualsevol moment si necessites aturar-te.
- Utilitza el Return per tornar al menú principal per reiniciar la partida

