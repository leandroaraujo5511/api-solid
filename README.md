# APP

GymPass styles app

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar
- [x] Deve ser possivel se autenticar 
- [x] Deve ser possivel obter o perfil de um usuário logado
- [x] Deve ser possivel ober o numero de check-ins realizado pelo usuario logado
- [x] Deve ser possivel o usuario obter o historico de check-ins
- [x] Deve ser possivel o usuario buscar academias proximas (até 10 km)
- [x] Deve ser possivel o usuario buscar academias pelo nome
- [x] Deve ser possivel o usuario realizar o check-in em uma academia
- [x] Deve ser possivel validar o check-in de um usuario
- [x] Deve ser possivel cadastrar uma academia

## RNs (Regras de negócios)

- [x] O usuário não deve se cadatrar com o email duplicado
- [x] O usuário não pode fazer 2 check-in no mesmo dia 
- [x] O usuário não pode fazer o check-in se não estiver a memos de 100 metros da academia
- [ ] O check-in so pode ser validado ate 20 minutos apos criado
- [ ] O Check-in so pode ser validado por administradores
- [ ] A academia so pode ser cadastrada por adminstradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa esta criptografado
- [x] Os dados da aplicaçao precisam esta persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginados com 20 item por pagina
- [ ] O usuario deve ser identificado por um JWT (JSOM WEB TOKEN)
