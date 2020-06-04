## Wybrane technologie DevOps 2020

:information_source:
**Ostatnia aktualizacja:** 04.06.2020

### DOCKER

<table>
  <tr>
    <th>Lab</th>
    <th>Data</th>
    <th>Zadanie</th>
    <th>Opis</th>
    <th>Komentarz</th>
  </tr>
  <tr>
    <td>1</td>
    <td>19.03.2020</td>
    <td><b>Silnia</b></td>
    <td>Obliczanie silni, Redis</td>
    <td>-</td>
  </tr>
  <tr>
    <td>2</td>
    <td>26.03.2020</td>
    <td><b>NWD</b></td>
    <td>
      Aplikacja wielokontenerowa:
      backend (Node) i cache (serwer Redis)
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>3</td>
    <td>02.04.2020</td>
    <td><b>Frontend</b></td>
    <td>Pierwszy frontend, aplikacja Reactowa</td>
    <td>-</td>
  </tr>
  <tr>
    <td>4</td>
    <td>09.04.2020</td>
    <td><b>Frontend + Travis</b></td>
    <td>Frontend i testowanie TravisCI</td>
    <td>
      <a href="https://github.com/mmazepa/docker-my-frontend">
        inne repo
      </a>
      :exclamation:
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td>16.04.2020</td>
    <td><b>Backend</b></td>
    <td>
      Aplikacja webowa (node + express + redis + pg)
      łącząca się do kontenerów Postgres i Redis
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>6</td>
    <td>23.04.2020</td>
    <td><b>All In One</b></td>
    <td>Zadanie zaliczeniowe, ciąg Fibonacciego</td>
    <td>-</td>
  </tr>
</table>

### KUBERNETES

<table>
  <tr>
    <th>Lab</th>
    <th>Data</th>
    <th>Zadanie</th>
    <th>Opis</th>
    <th>Komentarz</th>
  </tr>
  <tr>
    <td>7</td>
    <td>30.04.2020</td>
    <td><b>k8s</b></td>
    <td>
      Definicje: POD, ReplicaSet, Deployment, NameSpace, Service
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>8</td>
    <td>07.05.2020</td>
    <td><b>k8s Node App</b></td>
    <td>
      Aplikacja NodeJS, losuje liczbę podczas uruchamiania,
      3 repliki w przestrzeni dev, Service typu NodePort
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>9</td>
    <td>14.05.2020</td>
    <td><b>Fragment clustra</b></td>
    <td>
      Fragment clustra, Redis (replicas 2), Backend (replicas 3),
      Service typu NodePort - dostęp do klastra, do usługi/api backend
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>10</td>
    <td>21.05.2020</td>
    <td><b>Cluster</b></td>
    <td>
      ConfigMap, Secret, rozbudowana sekcja env w deploymencie + frontend
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>11</td>
    <td>28.05.2020</td>
    <td><b>Cluster2</b></td>
    <td>
      StorageClass, PersistentVolume, PersistentVolumeClaim
      + postgres deployment
    </td>
    <td>-</td>
  </tr>
  <tr>
    <td>12</td>
    <td>-</td>
    <td><b>FullCluster</b></td>
    <td>
      Kompletny klaster uwzględniający trzy wcześniejsze
    </td>
    <td>
      <i>w budowie...</i>
      :exclamation:
    </td>
  </tr>
</table>
