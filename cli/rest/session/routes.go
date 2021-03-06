package session

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetSession").
		Methods(http.MethodGet).Path("/sessions/{id}").
		HandlerFunc(HandlerGetSession(ctx))
	r.Name("GetSessionsForAddress").
		Methods(http.MethodGet).Path("/accounts/{address}/sessions").
		HandlerFunc(HandlerGetSessionsForAddress(ctx))
	r.Name("StartSession").
		Methods(http.MethodPost).Path("/accounts/{address}/subscriptions/{id}/sessions").
		HandlerFunc(HandlerStartSession(ctx))
}
