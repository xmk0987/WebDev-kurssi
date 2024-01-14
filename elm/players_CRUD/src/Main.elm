module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            let 
                oldPlayer  = model.newPlayer
                newNewPlayer = 
                    { oldPlayer | name = name }
            in 
                let
                    updatedModel = { model | newPlayer =  newNewPlayer }
                in
                Debug.log ("Name Changed: " ++ name) updatedModel
            
        AddPlayer ->
            let
                newId =
                    case List.maximum <| List.map .id model.players of
                        Just maxId ->
                            maxId + 1

                        Nothing ->
                            1

                updatedModel =
                    { model | 
                        players = model.players ++ [Player newId model.newPlayer.name False]
                        , newPlayer = initPlayer (newId + 1)
                    }
            in
            Debug.log "Updated Model" updatedModel

        DeletePlayer id ->
            { model | players = List.filter (\player -> player.id /= id) model.players }

        ModifyPlayer id status ->
            let
                updateStatus player = 
                    if player.id == id then
                        let
                            updatedPlayer = { player | isActive = status }
                        in
                        Debug.log ("Player Status Changed: " ++ String.fromInt id) updatedPlayer
                    else 
                        player

                updatedPlayers = 
                    List.map updateStatus model.players
            in
            {model | players = updatedPlayers}
           
            

view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm test Exercise: Players CRUD" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
            [ input [ type_ "text", id "input-player", value model.newPlayer.name, onInput SetName ] [] 
            , button [ type_ "submit", id "btn-add"] [ text "Add"] ] 
        , ol [ id "players-list" ] (List.map viewPlayer model.players) 
        ]

viewPlayer : Player -> Html Msg
viewPlayer player = 
    li [id ("player-" ++ String.fromInt (player.id))]
        [ div [class "player-name"] [text player.name]
        , label [] 
            [ input [type_ "checkbox", class "player-status", onCheck (\isChecked -> ModifyPlayer player.id isChecked)] []
            , span [class "checkmark"] []
            , text (if player.isActive then "Active" else "Not active")
            ]
        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete"]
    ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
