-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { 
        players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
    }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
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
                (Debug.log ("Name Changed: " ++ name) updatedModel, Cmd.none)
            
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
            (Debug.log "Players: " updatedModel, Cmd.none)

        DeletePlayer id ->
            ({ model | players = List.filter (\player -> player.id /= id) model.players }, Cmd.none)

        ModifyPlayer id status ->
            let
                updateStatus player = 
                    if player.id == id then
                        let
                            updatedPlayer = { player | isActive = status }
                        in
                        updatedPlayer
                    else 
                        player

                updatedPlayers = 
                    List.map updateStatus model.players
            in
            ({model | players = updatedPlayers}, Cmd.none)


        FetchPlayers data ->
            case data of
                Ok players ->
                     let
                        newId =
                            case List.maximum <| List.map .id players of
                                Just maxId ->
                                    maxId + 1

                                Nothing ->
                                    1

                        updatedModel =
                            { model | reqStatus = "", players = players, newPlayer = initPlayer newId }
                    in
                    Debug.log "fetch players" (updatedModel, Cmd.none)

                Err _ ->
                    let
                        updatedModel =
                            { model | reqStatus = "An error has occurred!!!"}
                    in
                    (updatedModel, Cmd.none)



view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm test Exercise: Players CRUD" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
            [ input [ type_ "text", id "input-player", value model.newPlayer.name, onInput SetName ] [] 
            , button [ type_ "submit", id "btn-add"] [ text "Add"] ] 
        , ol [ id "players-list" ] (List.map viewPlayer model.players)
        , div [id "request-status"] [text model.reqStatus]
        ]

viewPlayer : Player -> Html Msg
viewPlayer player = 
    li [id ("player-" ++ String.fromInt (player.id))]
        [ div [class "player-name"] [text player.name]
        , label [] 
            [ input [type_ "checkbox", class "player-status", onCheck (\isChecked -> ModifyPlayer player.id isChecked), checked player.isActive] []
            , span [class "checkmark"] [ ]
            , text (if player.isActive then "Active" else "Not active")
            ]
        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete"]
    ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
