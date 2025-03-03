import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

// BOOK COMPONENTS
import Books from "./components/Books";
import BookPage from "./components/bookPage/BookPage";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";

// AUTH COMPONENTS
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import PageNotFound from "./components/layout/PageNotFound";
import AdminPanel from "./components/AdminPanel";
import Search from "./components/search/Search";
import Author from "./components/Author";
import Reviewer from "./components/Reviewer";

export default function Routes({ books, user, isLoggedIn }) {
  return (
    <Switch>
      {/* Admin Only */}
      {isLoggedIn && user.role == "Admin" ? (
        <Route
          path="/admin-panel"
          render={props => <AdminPanel {...props} user={user} />}
        />
      ) : null}

      {/* Admin and Editor */}
      {isLoggedIn && (user.role == "Admin" || user.role == "Editor") ? (
        <Route
          path="/book/:id/edit"
          render={props => (
            <EditBook {...props} userId={user.id} userRole={user.role} />
          )}
        />
      ) : null}
      {isLoggedIn && (user.role == "Admin" || user.role == "Editor") ? (
        <Route
          path="/book/create"
          render={props => <CreateBook {...props} userId={user.id} />}
        />
      ) : null}

      {/* Any Logged in User */}
      {isLoggedIn ? (
        <Route
          path="/dashboard"
          render={props => <Dashboard {...props} userId={user.id} />}
        />
      ) : null}

      {/* Not logged in */}
      {isLoggedIn ? null : <Route path="/login" component={Login} />}
      {isLoggedIn ? null : <Route path="/register" component={Register} />}

      {/* Everyone */}
      <Route
        path="/author/:author"
        render={props => <Author {...props} books={books} />}
      />
      <Route
        path="/reviewer/:reviewer"
        render={props => <Reviewer {...props} books={books} />}
      />
      <Route
        path="/book/:id"
        render={props => (
          <BookPage
            {...props}
            isLoggedIn={isLoggedIn}
            user={user}
            books={books}
          />
        )}
      />
      <Route path="/about" component={About} />
      <Route
        path="/search/:q/:p?"
        render={props => <Search {...props} books={books} />}
      />
      <Route
        exact
        path="/"
        render={props => <Books {...props} books={books} />}
      />
      <Route component={PageNotFound} />
    </Switch>
  );
}
