import React, { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../../../Context/authContext";
import { useAuthorizationHeader } from "../../Hooks/AuthHook/auth.hook";
import { useGetRequest } from "../../Hooks/ServerRequestHooks/serverRequestHooks";
import List from "../../List/list";
import ListItem from "../../ListItem/listItem";
import Loader from "../../Loader/loader";
import { Link } from "react-router-dom";


function LinksPage(props) {
    debugger;
    const [links, setLinks] = useState([]);
    const { token } = useContext(AuthContext);
    const authorizationHeader = useAuthorizationHeader(token);

    const getRequestOptions = useMemo(() => {
        return { url: `api/link/` };
    }, []);

    const { isLoading, request } = useGetRequest(getRequestOptions);

    useEffect(() => {
        async function getLinks() {
            try {
                const resultData = await request({ headers: authorizationHeader });
                debugger;
                if (resultData) {
                    setLinks(resultData.links);
                }
            } catch (error) {
                debugger;
            }
        };

        getLinks();
    }, [authorizationHeader]);

    const listItems = useMemo(() => {
        return links.map((link, i) => {
            return (
                <ListItem key={link.date}>
                    <dl className="c-links__data-list">
                        <div className="c-links__field">
                            <dt className="c-links__title">No:</dt>
                            <dd className="c-links__data">{i + 1}</dd>
                        </div>
                        <div className="c-links__field">
                            <dt className="c-links__title">Original Link:</dt>
                            <dd className="c-links__data"><a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></dd>
                        </div>
                        <div className="c-links__field">
                            <dt className="c-links__title">Shortened Link:</dt>
                            <dd className="c-links__data"><a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></dd>
                        </div>
                        <div className="c-links__field">
                            <dt className="c-links__title">Open:</dt>
                            <dd className="c-links__data">
                                <Link to={`/details/${link._id}`}>Link Page</Link>
                            </dd>
                        </div>
                    </dl>
                </ListItem>
            );
        });
    }, [links]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section id="linksPage">
            <h2>Links Page</h2>
            {!listItems.length && <p>No links created yet.</p>}
            <div>
                <List>{listItems}</List>
            </div>
        </section>
    )
};

export default LinksPage; 