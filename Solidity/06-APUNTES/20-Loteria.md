# Loteria ERC-20 y ERC-721
- Tendré un contrato principal el cual va a permitir que la gente compre Tokens ERC-20
    - Los boletos de lotería serán un token ERC-20.
    - Cuando alguien compre un boleto, va agenerar un token NFT
    - Tendré un Factory. Cada usuario podrá gestionar sus boletos (cada SC se va a relacionar con un usuario)
- Puedo hacer un ganador para que se lleve beneficios, pero también como desarrolladores obtenemos beneficios por el desarrollo

----

# Primeros pasos

- Voy a necesitar los tokens ERC-20 y ERC-721
- Porqué no uso el ERC-1155 que junta a los dos?
    - El ERC-20 me va a servir para comprar boletos
    - El ERC-721 me va a servir para identificar esos boletos con NFT's
    - Son propósitos distintos. De esta forma no puedo juntarlos en uno solo
- Los importo de openzeppelin (en node_modules previa instalación con npm)
- Necesitaré algunas propiedades y filtrados del owner

~~~js
//SPDX-License_Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
~~~

- Creo el contrato
- El ERC-20 y el ERC-721 compraten varias funciones. Si los importo los dos por herencias tendré un conflicto
- Entonces, incluiré por herencia solo el ERC-20 y el Ownable
- Empezaré por la gestión de los tokens. Que se puedan comprar tokens, que se puedan vender, etc
- Esos tokens ERC-20 servirán para que la persona compre boletos

- En el constructor tengo que agregar el nombre y el símbolo
- Cuantos tokens voy a crear/mintear al desplegar el contrato? 1000
    - A quién van a ir, quién los va a almacenar? el propio contrato. Hago referencia a él a través de address(this)
~~~js
contract loteria  is ERC20, Ownable{

    //Gestión de los tokens

    constructor() ERC20("Loteria", "Lt"){
        _mint(address(this), 1000);
    }

}
~~~
- Voy a generar una variable con la dirección del contrato NFT del proyecto.
- Será un contrato por separado que se va a encargar de la gestión de los NFT

> address public nft;

- Este contrato NFT todavía no existe. Para ello voy a crear un pequeño contrato en el mismo archivo
- Quiero hacer que en algún moemnto el contrato principal diga: ey! quiero un smart contract de NFTs, y lo quiero hacer de forma automatica
- Para ello usaré el constructor para que cuando se haga el despliegue del contrato principal se haga de forma automática el deploy de este segundo contrato

~~~js
contract loteria  is ERC20, Ownable{

    //Gestión de los tokens

    //Dirección del contrato NFT del proyecto
    address public nft;

    constructor() ERC20("Loteria", "Lt"){
        _mint(address(this), 1000);

        nft = address(new mainERC721());
    }

}

contract mainERC721 is ERC721 {

    constructor() ERC721("Loteria", "STE"){}
}
~~~

- Esto creará un nuevo smart contract de tipo mainERC721. Esto solo se hará una vez, en el deploy de este Smart Contract
- Voy a almacenar al ganador en el contrato principal
- Voy a necesitar una estructura de datos porque me interesa que los usuarios puedan gestionar SC por su lado
- No se gestionará desde este principal que solo es para comprar y recibir el premio
- En cambio tendrán otro SC en el que cada usuario será el owner de dicho contrato otorgando unos requisitos de propiedad al usuario
- Necesito un registro del usuario. Para ello hago un mapping de la dirección del usuario a la de su SC

~~~js
contract loteria  is ERC20, Ownable{

    //Gestión de los tokens

    //Dirección del contrato NFT del proyecto
    address public nft;

    constructor() ERC20("Loteria", "Lt"){
        _mint(address(this), 1000);

        nft = address(new mainERC721());
    }

    address public ganador;

    mapping(address=> address) public usuario_contract; 

}
~~~

# Funcionalidades de control y gestión de los activos económicos



