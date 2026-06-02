# Sistema de Monitoramento de EPI com Visão Computacional

Este é um projeto base que utiliza **OpenCV** e **Ultralytics YOLOv8** para identificar objetos em tempo real utilizando a webcam. O script foi desenhado para ser um ponto de partida robusto e rápido para a detecção de Equipamentos de Proteção Individual (EPIs).

## Estrutura do Projeto

- `main.py`: O script principal que roda a inferência da IA na webcam.
- `requirements.txt`: As dependências da linguagem Python para rodar a IA.
- `README.md`: Este roteiro.

## Instalação

Assegure-se de ter o Python instalado. O ideal é ter a versão 3.9 ou superior.

1. Abra o terminal nesta pasta (`c:\Users\João Gabriel\Documents\IAIntegrador`).
2. Instale as bibliotecas executando o comando abaixo:
   ```bash
   pip install -r requirements.txt
   ```

## Como Executar

Com as bibliotecas instaladas, rode o script principal:
```bash
python main.py
```

Ele irá abrir a sua câmera e começar a detectar. No primeiro uso, a biblioteca YOLO fará o download da internet (o modelo `yolov8n.pt` genérico) automaticamente para testes. Pressione "Q" para fechar a tela de exibição da IA.

## Como incluir uma Inteligência Artificial focada em EPIs

O YOLOv8 que está no script por padrão foi treinado para objetos gerais (identificar `person`, `car`, `cup` etc.). Ele deverá identificar você imediatamente como "person".
Para ele reconhecer precisamente **Capacete, Óculos, Máscara, Luvas e Botas**, você deve obter um modelo treinado especificamente para isso.

### Passo-a-passo:
1. Vá até o site [Roboflow Universe](https://universe.roboflow.com/) e busque por *"PPE Detection YOLOv8"*.
2. Você achará dezenas de modelos de IA prontos e treinados gratuitamente por outras pessoas para detecção rigorosa de EPI.
3. Escolha o melhor modelo e baixe os *pesos (weights)* do modelo customizado no formato para o **YOLOv8** (costuma ser um arquivo que termina em `.pt`, normalmente recebendo o nome `best.pt`).
4. Coloque este arquivo (`best.pt`) na mesma pasta que o script `main.py`.
5. Abra o `main.py` e altere a seguinte linha no código:
   - **De:** `model = YOLO('yolov8n.pt')`
   - **Para:** `model = YOLO('best.pt')`
6. Rode `python main.py` novamente. A câmera agora se tornou um agente que só vê e classifica a utilização correta dos EPIs!
