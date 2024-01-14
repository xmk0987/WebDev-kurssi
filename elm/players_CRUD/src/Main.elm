module Main exposing (..)

import Browser
import Html exposing (Html, button, div, form, input, h1, label, li, ol, text)
import Html.Attributes exposing (class, type_, value, id)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit, preventDefaultOn)


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
                { model | newPlayer =  newNewPlayer }
            
        AddPlayer ->
            let
                updatedModel =
                    { model | players = model.players ++ [model.newPlayer], newPlayer = initPlayer (model.newPlayer.id + 1) }
            in
            updatedModel

        DeletePlayer id ->
            { model | players = List.filter (\player -> player.id /= id) model.players }

        ModifyPlayer id status ->
           let
                updateStatus player = 
                    if player.id == id then
                        { player | isActive = status }
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
        , form [ onSubmit AddPlayer ]
        [ input [ type_ "text", id "input-player", value model.newPlayer.name, onInput SetName ] [] 
        , button [ type_ "submit" ] [ text "Add"] ] 
        , ol [ id "players-list" ] (List.map viewPlayer model.players)
        ]

viewPlayer : Player -> Html Msg
viewPlayer player = 
    li []
        [ div [class "player-name"] [text player.name]
        , input [type_ "checkbox", class "player-status", onClick (ModifyPlayer player.id (not player.isActive))] []
        , label [class "player-status"] [text (if player.isActive then "Active" else "Not active")]
        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete"]
        ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
