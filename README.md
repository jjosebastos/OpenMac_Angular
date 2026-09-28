# 🍏 Openmac - CRM & Inventory Management SaaS

> Um sistema completo de Customer Relationship Management (CRM) e gestão de estoque projetado especificamente para assistências técnicas especializadas em reparos avançados de hardware.

## 📖 Sobre o Projeto

O **Openmac** é uma aplicação SaaS desenvolvida para resolver os desafios de gerenciamento de ordens de serviço, controle minucioso de componentes e relacionamento com clientes em assistências técnicas. O sistema permite rastrear desde a entrada do equipamento até a entrega, cobrindo fluxos complexos como reparos em placas lógicas, substituição de telas e regravação de BIOS/EEPROM.

A arquitetura foi pensada para ser escalável, dividindo as responsabilidades entre uma API RESTful robusta no backend e uma interface de usuário dinâmica e responsiva no frontend.

## 🎨 Design e Protótipo

O planejamento visual e a experiência do usuário (UX/UI) foram desenhados previamente. Você pode conferir o protótipo interativo e as telas do sistema acessando o link abaixo:

🔗 **[Acessar Protótipo no Figma](https://www.figma.com/design/sfAhUsjkHwYL7zzJCHkJL6/bn-code?node-id=0-1&p=f&t=xQSIi5qyYxwgQMz3-0)**

## 🚀 Principais Funcionalidades

* **Gestão de Ordens de Serviço (OS):** Criação, atualização e rastreamento de status de reparos em tempo real.
* **Controle de Estoque Detalhado:** Catalogação de componentes e peças de reposição específicas para diferentes modelos de equipamentos.
* **Histórico de Reparos Avançados:** Registro de diagnósticos complexos, incluindo reparos em nível de componente e intervenções de software/firmware.
* **Painel do Cliente (CRM):** Gestão de dados dos clientes, histórico de serviços prestados e canais de comunicação.
* **Mapeamento de Dados Otimizado:** Utilização de DTOs para tráfego seguro e leve de informações entre o banco de dados e as requisições web.

## 🛠️ Tecnologias e Ferramentas

### **Backend**
* **Java 17+**
* **Spring Boot** (Web, Data JPA, Security)
* **Gradle:** Gerenciador de dependências e automação de builds.
* **Database Migrations (Flyway/Liquibase):** Controle de versão e evolução do esquema do banco de dados.
* **MapStruct:** Mapeamento eficiente entre Entidades e DTOs.
* **PostgreSQL:** Banco de dados relacional para persistência.
* **Arquitetura RESTful:** Endpoints bem definidos para comunicação.

### **Frontend**
* **Angular:** Framework principal para a construção da interface (SPA).
* **TypeScript:** Tipagem estática e segurança ao código.
* **Tailwind CSS:** Estilização responsiva, moderna e padronizada.

### **DevOps e Infraestrutura**
* **Docker & Docker Compose:** Containerização da aplicação, banco de dados e serviços auxiliares de forma orquestrada.
* **Git:** Versionamento de código e colaboração.

## ⚙️ Arquitetura do Sistema

O padrão de arquitetura segue o modelo **Client-Server**. O Frontend (Angular) se comunica via requisições HTTP (REST) com o Backend (Spring Boot). O Backend gerencia a regra de negócio, aplica validações de segurança e se comunica com o banco de dados PostgreSQL utilizando o padrão Repository (Spring Data JPA).

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
* Java Development Kit (JDK) 17+
* Node.js e Angular CLI instalados
* Docker e Docker Compose instalados
* Git

### Passos para Instalação

**1. Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/openmac-crm.git
cd openmac-crm
```

**2. Subindo a Infraestrutura com Docker Compose (Banco de Dados):**
```bash
docker-compose up -d
```

**3. Executando o Backend (Spring Boot + Gradle):**
As migrations rodarão automaticamente ao iniciar a aplicação para estruturar o banco de dados.
```bash
cd backend
./gradlew bootRun
```

**4. Executando o Frontend (Angular):**
```bash
cd ../frontend
npm install
ng serve
```

**5. Acesso:**
* Frontend: `http://localhost:4200`
* Backend API: `http://localhost:8080/api`

## 📈 Próximos Passos (Roadmap)
- [ ] Implementação de disparo de notificações automáticas via e-mail/WhatsApp para clientes.
- [ ] Geração de relatórios e dashboards analíticos de faturamento e peças mais utilizadas.
- [ ] Integração com sistema de emissão de Notas Fiscais (NFS-e).

## 👨‍💻 Autor

**José Bezerra Bastos Neto**  
Desenvolvedor de Software (Fullstack / Backend)  
[LinkedIn](https://linkedin.com/in/seu-perfil) | [GitHub](https://github.com/seu-usuario)
